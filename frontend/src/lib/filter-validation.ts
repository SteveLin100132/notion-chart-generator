import { FilterGroup, FilterCondition } from "@/components/query-builder";
import { DatabaseProperty } from "@/lib/store";

/**
 * 檢查單個篩選條件是否有錯誤
 */
export function validateFilterCondition(
  condition: FilterCondition,
  property: DatabaseProperty | undefined,
  groupIndex: number,
  conditionIndex: number
): string | null {
  if (!property) return null;

  // 檢查日期區間條件
  if (property.type === "date" && condition.operator === "between") {
    // 更安全的日期解析
    const parseDate = (
      dateStr: string | number | boolean | undefined
    ): Date | null => {
      if (!dateStr || typeof dateStr !== "string") return null;
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? null : date;
    };

    const start = parseDate(condition.value);
    const end = parseDate(condition.endValue);

    if (start && end && end < start) {
      return `群組${groupIndex + 1} 第${
        conditionIndex + 1
      }個條件：結束日期不能早於開始日期`;
    }
  }

  // 可以在這裡添加其他驗證規則
  // 例如：必填字段檢查、數值範圍檢查等

  return null;
}

/**
 * 檢查所有群組條件的錯誤
 */
export function getAllFilterErrors(
  groups: FilterGroup[],
  properties: DatabaseProperty[]
): string[] {
  const errors: string[] = [];

  groups.forEach((group, groupIdx) => {
    group.conditions.forEach((condition, condIdx) => {
      const property = properties.find((p) => p.name === condition.property);
      const error = validateFilterCondition(
        condition,
        property,
        groupIdx,
        condIdx
      );
      if (error) {
        errors.push(error);
      }
    });

    // 遞歸檢查子群組
    if (group.subgroups && group.subgroups.length > 0) {
      errors.push(...getAllFilterErrors(group.subgroups, properties));
    }
  });

  return errors;
}

/**
 * 檢查是否有任何錯誤
 */
export function hasFilterErrors(
  groups: FilterGroup[],
  properties: DatabaseProperty[]
): boolean {
  return getAllFilterErrors(groups, properties).length > 0;
}
