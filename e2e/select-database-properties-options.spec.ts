import { test } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

// Playwright 測試設定
test.use({
  trace: "on",
  screenshot: "on",
  video: {
    mode: "on",
    size: { width: 1920, height: 1080 },
  },
  permissions: ["clipboard-read", "clipboard-write"],
});

/**
 * Notion Chart Generator E2E 測試
 */
test("Notion Chart Generator - 資料庫屬性下拉選單支援模糊搜尋功能", async ({
  page,
}) => {
  // 設定測試超時時間，這裡設定為 120 秒，確保有足夠時間
  test.setTimeout(120000);

  // 設定視窗大小
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 前往 Notion Chart Generator 網站
  await page.goto(process.env.E2E_TEST_HOST || "http://localhost:3000/");

  // 注入滑鼠軌跡顯示腳本
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .__pw-mouse-pointer {
        pointer-events: none;
        position: fixed;
        z-index: 9999;
        width: 24px;
        height: 24px;
        margin-left: -12px;
        margin-top: -12px;
        border-radius: 12px;
        background: rgba(255,0,0,0.5);
        box-shadow: 0 0 8px 2px rgba(255,0,0,0.3);
        transition: left 0.05s linear, top 0.05s linear;
      }
    `;
    document.head.appendChild(style);
    const pointer = document.createElement("div");
    pointer.className = "__pw-mouse-pointer";
    document.body.appendChild(pointer);
    document.addEventListener(
      "mousemove",
      (event) => {
        pointer.style.left = event.clientX + "px";
        pointer.style.top = event.clientY + "px";
      },
      true
    );
  });

  // 輸入 Notion API 金鑰
  const notionApiKeyInput = page.getByRole("textbox", {
    name: "secret_xxx 或 ntn_xxx",
  });
  const notionApiKeyInputBoundingBox = await notionApiKeyInput.boundingBox();
  if (notionApiKeyInputBoundingBox) {
    await page.mouse.move(
      (notionApiKeyInputBoundingBox?.x ?? 0) +
        notionApiKeyInputBoundingBox.width / 2,
      (notionApiKeyInputBoundingBox?.y ?? 0) +
        notionApiKeyInputBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await notionApiKeyInput.fill(process.env.E2E_TEST_NOTION_API_KEY || "");
  await page.waitForTimeout(750);

  // 點擊「載入資料庫」按鈕
  const loadDatabaseButton = page.getByRole("button", { name: "載入資料庫" });
  const loadDatabaseButtonBoundingBox = await loadDatabaseButton.boundingBox();
  if (loadDatabaseButtonBoundingBox) {
    await page.mouse.move(
      (loadDatabaseButtonBoundingBox?.x ?? 0) +
        loadDatabaseButtonBoundingBox.width / 2,
      (loadDatabaseButtonBoundingBox?.y ?? 0) +
        loadDatabaseButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await loadDatabaseButton.click();
  await page.waitForTimeout(750);

  // 等待資料庫載入完成
  const databaseListComboBox = page.getByRole("combobox");
  await databaseListComboBox.waitFor({ state: "visible" });
  const databaseListComboBoxBoundingBox =
    await databaseListComboBox.boundingBox();
  if (databaseListComboBoxBoundingBox) {
    await page.mouse.move(
      (databaseListComboBoxBoundingBox?.x ?? 0) +
        databaseListComboBoxBoundingBox.width / 2,
      (databaseListComboBoxBoundingBox?.y ?? 0) +
        databaseListComboBoxBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await databaseListComboBox.click();

  // 選擇「合約」資料庫
  const contractOption = page.getByRole("option", { name: "合約" });
  const contractOptionBoundingBox = await contractOption.boundingBox();
  if (contractOptionBoundingBox) {
    await page.mouse.move(
      (contractOptionBoundingBox?.x ?? 0) + contractOptionBoundingBox.width / 2,
      (contractOptionBoundingBox?.y ?? 0) +
        contractOptionBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await contractOption.click();
  await page.waitForTimeout(750);

  // 選擇 X 軸屬性
  const xAxisCombobox = page
    .getByRole("combobox")
    .filter({ hasText: "選擇 X 軸屬性" });
  const xAxisComboboxBoundingBox = await xAxisCombobox.boundingBox();
  if (xAxisComboboxBoundingBox) {
    await page.mouse.move(
      (xAxisComboboxBoundingBox?.x ?? 0) + xAxisComboboxBoundingBox.width / 2,
      (xAxisComboboxBoundingBox?.y ?? 0) + xAxisComboboxBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await xAxisCombobox.click();

  const xAxisOption = page.getByRole("option", {
    name: "聯絡人電話 (phone_number)",
  });
  const xAxisOptionBoundingBox = await xAxisOption.boundingBox();
  if (xAxisOptionBoundingBox) {
    await page.mouse.move(xAxisOptionBoundingBox.x, xAxisOptionBoundingBox.y, {
      steps: 20,
    });
    await page.mouse.move(
      xAxisOptionBoundingBox.x + xAxisOptionBoundingBox.width,
      xAxisOptionBoundingBox.y,
      { steps: 20 }
    );
    await page.mouse.move(
      xAxisOptionBoundingBox.x + xAxisOptionBoundingBox.width,
      xAxisOptionBoundingBox.y + 200,
      { steps: 20 }
    );
    await page.mouse.move(
      xAxisOptionBoundingBox.x,
      xAxisOptionBoundingBox.y + 200,
      {
        steps: 20,
      }
    );
    await page.mouse.move(xAxisOptionBoundingBox.x, xAxisOptionBoundingBox.y, {
      steps: 20,
    });
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(3000);
});
