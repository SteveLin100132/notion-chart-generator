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
 * 測試建立圖表的完整流程，包括載入資料庫、選擇屬性、設定篩選條件、生成圖表等。
 * 確保所有步驟都能正常運作，並且能夠在分享連結中正確顯示圖表。
 */
test("Notion Chart Generator - 建立圖表流程", async ({ page }) => {
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

  const xAxisOption = page.getByRole("option", { name: "合約名稱 (title)" });
  const xAxisOptionBoundingBox = await xAxisOption.boundingBox();
  if (xAxisOptionBoundingBox) {
    await page.mouse.move(
      (xAxisOptionBoundingBox?.x ?? 0) + xAxisOptionBoundingBox.width / 2,
      (xAxisOptionBoundingBox?.y ?? 0) + xAxisOptionBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await xAxisOption.click();
  await page.waitForTimeout(750);

  // 選擇 Y 軸屬性
  const yAxisCombobox = page
    .getByRole("combobox")
    .filter({ hasText: "選擇 Y 軸屬性（可選）" });
  const yAxisComboboxBoundingBox = await yAxisCombobox.boundingBox();
  if (yAxisComboboxBoundingBox) {
    await page.mouse.move(
      (yAxisComboboxBoundingBox?.x ?? 0) + yAxisComboboxBoundingBox.width / 2,
      (yAxisComboboxBoundingBox?.y ?? 0) + yAxisComboboxBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await yAxisCombobox.click();

  const yAxisOption = page.getByRole("option", {
    name: "合約金額 (含稅價) (number)",
  });
  const yAxisOptionBoundingBox = await yAxisOption.boundingBox();
  if (yAxisOptionBoundingBox) {
    await page.mouse.move(
      (yAxisOptionBoundingBox?.x ?? 0) + yAxisOptionBoundingBox.width / 2,
      (yAxisOptionBoundingBox?.y ?? 0) + yAxisOptionBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await yAxisOption.click();
  await page.waitForTimeout(750);

  // 點擊「設定篩選條件」按鈕
  const filterButton = page.getByRole("button", { name: "設定篩選條件" });
  const filterButtonBoundingBox = await filterButton.boundingBox();
  if (filterButtonBoundingBox) {
    await page.mouse.move(
      (filterButtonBoundingBox?.x ?? 0) + filterButtonBoundingBox.width / 2,
      (filterButtonBoundingBox?.y ?? 0) + filterButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(750);
  }
  await filterButton.click();
  await page.waitForTimeout(750);

  // 選擇篩選條件
  const filterCombobox = page
    .getByRole("combobox")
    .filter({ hasText: "選擇屬性" });
  const filterComboboxBoundingBox = await filterCombobox.boundingBox();
  if (filterComboboxBoundingBox) {
    await page.mouse.move(
      (filterComboboxBoundingBox?.x ?? 0) + filterComboboxBoundingBox.width / 2,
      (filterComboboxBoundingBox?.y ?? 0) +
        filterComboboxBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await filterCombobox.click();
  await page.waitForTimeout(500);

  const filterOption = page.getByRole("option", {
    name: "合約處理狀態 (status)",
  });
  const filterOptionBoundingBox = await filterOption.boundingBox();
  if (filterOptionBoundingBox) {
    await page.mouse.move(
      (filterOptionBoundingBox?.x ?? 0) + filterOptionBoundingBox.width / 2,
      (filterOptionBoundingBox?.y ?? 0) + filterOptionBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await filterOption.click();
  await page.waitForTimeout(500);

  // 選擇篩選條件類型
  const filterConditionCombobox = page
    .getByRole("combobox")
    .filter({ hasText: "選擇條件" });
  const filterConditionComboboxBoundingBox =
    await filterConditionCombobox.boundingBox();
  if (filterConditionComboboxBoundingBox) {
    await page.mouse.move(
      (filterConditionComboboxBoundingBox?.x ?? 0) +
        filterConditionComboboxBoundingBox.width / 2,
      (filterConditionComboboxBoundingBox?.y ?? 0) +
        filterConditionComboboxBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await filterConditionCombobox.click();
  await page.waitForTimeout(500);

  const conditionOption = page.getByRole("option", {
    name: "等於",
    exact: true,
  });
  const conditionOptionBoundingBox = await conditionOption.boundingBox();
  if (conditionOptionBoundingBox) {
    await page.mouse.move(
      (conditionOptionBoundingBox?.x ?? 0) +
        conditionOptionBoundingBox.width / 2,
      (conditionOptionBoundingBox?.y ?? 0) +
        conditionOptionBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await conditionOption.click();
  await page.waitForTimeout(500);

  // 選擇篩選值
  const filterValueCombobox = page
    .getByRole("combobox")
    .filter({ hasText: "選擇選項" });
  const filterValueComboboxBoundingBox =
    await filterValueCombobox.boundingBox();
  if (filterValueComboboxBoundingBox) {
    await page.mouse.move(
      (filterValueComboboxBoundingBox?.x ?? 0) +
        filterValueComboboxBoundingBox.width / 2,
      (filterValueComboboxBoundingBox?.y ?? 0) +
        filterValueComboboxBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await filterValueCombobox.click();
  await page.waitForTimeout(500);

  const filterValueOption = page
    .getByRole("option")
    .filter({ hasText: "未開始" });
  const filterValueOptionBoundingBox = await filterValueOption.boundingBox();
  if (filterValueOptionBoundingBox) {
    await page.mouse.move(
      (filterValueOptionBoundingBox?.x ?? 0) +
        filterValueOptionBoundingBox.width / 2,
      (filterValueOptionBoundingBox?.y ?? 0) +
        filterValueOptionBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await filterValueOption.click();
  await page.waitForTimeout(500);

  // 點擊「套用篩選」按鈕
  const applyFilterButton = page.getByRole("button", { name: /^套用篩選.*/ });
  const applyFilterButtonBoundingBox = await applyFilterButton.boundingBox();
  if (applyFilterButtonBoundingBox) {
    await page.mouse.move(
      (applyFilterButtonBoundingBox?.x ?? 0) +
        applyFilterButtonBoundingBox.width / 2,
      (applyFilterButtonBoundingBox?.y ?? 0) +
        applyFilterButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await applyFilterButton.click();
  await page.waitForTimeout(500);

  // 點擊「生成圖表」按鈕
  const generateChartButton = page.getByRole("button", { name: "生成圖表" });
  const generateChartButtonBoundingBox =
    await generateChartButton.boundingBox();
  if (generateChartButtonBoundingBox) {
    await page.mouse.move(
      (generateChartButtonBoundingBox?.x ?? 0) +
        generateChartButtonBoundingBox.width / 2,
      (generateChartButtonBoundingBox?.y ?? 0) +
        generateChartButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await generateChartButton.click();
  await page.locator("canvas").waitFor({ state: "visible" });
  await page.waitForTimeout(1250);

  // 重新選擇圖表類型
  const radarChartButton = page.getByRole("button", { name: "雷達圖" });
  const radarChartButtonBoundingBox = await radarChartButton.boundingBox();
  if (radarChartButtonBoundingBox) {
    await page.mouse.move(
      (radarChartButtonBoundingBox?.x ?? 0) +
        radarChartButtonBoundingBox.width / 2,
      (radarChartButtonBoundingBox?.y ?? 0) +
        radarChartButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await radarChartButton.click();
  await page.waitForTimeout(750);

  // 點擊「資料」按鈕
  const dataButton = page.getByRole("button", { name: "Data" });
  await dataButton.waitFor({ state: "visible" });
  const dataButtonBoundingBox = await dataButton.boundingBox();
  if (dataButtonBoundingBox) {
    await page.mouse.move(
      (dataButtonBoundingBox?.x ?? 0) + dataButtonBoundingBox.width / 2,
      (dataButtonBoundingBox?.y ?? 0) + dataButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await dataButton.click();
  await page.waitForTimeout(500);

  const heading = await page.getByRole("heading", { name: "資料表格" });
  await heading.waitFor({ state: "visible" });
  const headingBoundingBox = await heading.boundingBox();
  if (headingBoundingBox) {
    await page.mouse.move(
      (headingBoundingBox?.x ?? 0) + headingBoundingBox.width / 2,
      (headingBoundingBox?.y ?? 0) + headingBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(750);

  // 點擊「分享」按鈕
  const shareButton = await page.getByRole("button", { name: "分享" });
  await shareButton.waitFor({ state: "visible" });
  const shareButtonBoundingBox = await shareButton.boundingBox();
  if (shareButtonBoundingBox) {
    await page.mouse.move(
      (shareButtonBoundingBox?.x ?? 0) + shareButtonBoundingBox.width / 2,
      (shareButtonBoundingBox?.y ?? 0) + shareButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await shareButton.click();

  // 等待分享對話框出現
  const shareDialog = await page.getByRole("dialog", { name: "分享圖表" });
  shareDialog.waitFor({ state: "visible" });
  await page.waitForTimeout(250);

  // 點擊「分享連結」按鈕
  const shareLinkButton = page
    .locator("div")
    .filter({
      hasText:
        /^分享連結 \(動態快照\)此連結可在新分頁或視窗中開啟，以嵌入模式顯示圖表$/,
    })
    .getByRole("button");
  const shareLinkButtonBoundingBox = await shareLinkButton.boundingBox();
  if (shareLinkButtonBoundingBox) {
    await page.mouse.move(
      (shareLinkButtonBoundingBox?.x ?? 0) +
        shareLinkButtonBoundingBox.width / 2,
      (shareLinkButtonBoundingBox?.y ?? 0) +
        shareLinkButtonBoundingBox.height / 2,
      { steps: 20 }
    );
    await page.waitForTimeout(250);
  }
  await shareLinkButton.click();
  await page.waitForTimeout(750);

  // 從剪貼簿中讀取分享連結並導航到該連結
  const clipboardContent = await page.evaluate(() =>
    navigator.clipboard.readText()
  );
  await page.goto(clipboardContent);

  // 等待分享連結的圖表畫布出現
  const shareLinkChartCanvas = await page.locator("canvas");
  await shareLinkChartCanvas.waitFor({ state: "visible" });
  await page.waitForTimeout(1250);
});
