import { test, expect } from "./fixture";

test.describe("Toggle switch", () => {
  test("Enabled by default", async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    const checkbox = page.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
  });

  test("Can be disabled", async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    const checkbox = page.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
    await page.locator("label").click();
    await expect(checkbox).not.toBeChecked();
  });

  test("Can be enabled", async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    const checkbox = page.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
    await page.locator("label").click();
    await expect(checkbox).not.toBeChecked();
    await page.locator("label").click();
    await expect(checkbox).toBeChecked();
  });
});

test.describe("English", () => {
  test.use({
    locale: "en",
  });

  test("Renders successfully", async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    await expect(
      page.getByRole("heading", { name: "ChatGPT RTL" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Automatically detects and align right-to-left texts in ChatGPT.",
      ),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
    await expect(page.getByText("Enable RTL texts auto align")).toBeVisible();
    await expect(
      page.getByText(
        "Enable or disable automatically right-to-left texts detection.",
      ),
    ).toBeVisible();
  });
});

test.describe("Arabic", () => {
  test.use({
    locale: "ar",
  });

  test("Renders successfully", async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    await expect(
      page.getByRole("heading", { name: "ChatGPT من اليمين الى اليسار" }),
    ).toBeVisible();
    await expect(
      page.getByText("ترقيم الصفحات ومحاذاة النص العربي تلقائيًا في ChatGPT."),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "إعدادات" })).toBeVisible();
    await expect(
      page.getByText("تفعيل المحاذاة التلقائية للغة العربية"),
    ).toBeVisible();
    await expect(
      page.getByText(
        "تمكين أو تعطيل المحاذاة التلقائية من اليمين إلى اليسار للنص العربي.",
      ),
    ).toBeVisible();
  });
});

test.describe("Hebrew", () => {
  test.use({
    locale: "he",
  });

  test("Renders successfully", async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    await expect(
      page.getByRole("heading", { name: "ChatGPT מימין-לשמאל" }),
    ).toBeVisible();
    await expect(
      page.getByText("עימוד ויישור של טקסט בעברית בצורה אוטומטית ב-ChatGPT."),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "הגדרות" })).toBeVisible();
    await expect(page.getByText("הפעל יישור אוטמוטי של עברית")).toBeVisible();
    await expect(
      page.getByText("הפעל או כבה יישור אוטומטי של טקסט בעברית מימין לשמאל."),
    ).toBeVisible();
  });
});
