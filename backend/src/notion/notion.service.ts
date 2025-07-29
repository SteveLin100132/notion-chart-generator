import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class NotionService {
  private readonly notionApi: AxiosInstance;

  constructor() {
    this.notionApi = axios.create({
      baseURL: 'https://api.notion.com/v1',
      headers: {
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });
  }

  private validateToken(token: string): void {
    if (!token || (!token.startsWith('secret_') && !token.startsWith('ntn_'))) {
      throw new BadRequestException(
        'Invalid token format. Token must start with "secret_" or "ntn_"',
      );
    }
  }

  private getAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getDatabases(token: string) {
    this.validateToken(token);

    try {
      const response = await this.notionApi.post(
        '/search',
        {
          filter: {
            property: 'object',
            value: 'database',
          },
        },
        {
          headers: this.getAuthHeaders(token),
        },
      );

      return response.data.results.map((db: any) => ({
        id: db.id,
        title: this.extractTitle(db.title),
        properties: Object.keys(db.properties || {}),
        last_edited_time: db.last_edited_time,
      }));
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid Notion token');
      }
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch databases',
        error.response?.status || 500,
      );
    }
  }

  async getDatabaseProperties(token: string, databaseId: string) {
    this.validateToken(token);

    try {
      const response = await this.notionApi.get(`/databases/${databaseId}`, {
        headers: this.getAuthHeaders(token),
      });

      const properties = Object.entries(response.data.properties || {}).map(
        ([name, property]: [string, any]) => ({
          name,
          type: property.type,
          id: property.id || name,
        }),
      );

      return {
        id: response.data.id,
        title: this.extractTitle(response.data.title),
        properties,
      };
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid Notion token');
      }
      if (error.response?.status === 404) {
        throw new BadRequestException(
          'Database not found or no access permission',
        );
      }
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch database properties',
        error.response?.status || 500,
      );
    }
  }

  async queryDatabase(
    token: string,
    databaseId: string,
    filter?: any,
    pageSize: number = 100,
    startCursor?: string,
  ) {
    this.validateToken(token);

    try {
      const requestBody: any = {
        filter,
        page_size: pageSize,
      };

      if (startCursor) {
        requestBody.start_cursor = startCursor;
      }

      const response = await this.notionApi.post(
        `/databases/${databaseId}/query`,
        requestBody,
        {
          headers: this.getAuthHeaders(token),
        },
      );

      return {
        results: response.data.results,
        has_more: response.data.has_more,
        next_cursor: response.data.next_cursor,
      };
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid Notion token');
      }
      if (error.response?.status === 404) {
        throw new BadRequestException(
          'Database not found or no access permission',
        );
      }
      throw new HttpException(
        error.response?.data?.message || 'Failed to query database',
        error.response?.status || 500,
      );
    }
  }

  private extractTitle(titleArray: any[]): string {
    if (!titleArray || !Array.isArray(titleArray) || titleArray.length === 0) {
      return 'Untitled';
    }
    return titleArray[0]?.plain_text || 'Untitled';
  }
}
