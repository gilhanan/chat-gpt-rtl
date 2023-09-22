import { test, expect } from "./fixture";

test.describe("Popup", () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);
  });

  test.describe("Toggle switch", () => {
    test("Enabled by default", async ({ page }) => {
      const checkbox = page.getByRole("checkbox");
      await expect(checkbox).toBeChecked();
    });

    test("Can be disabled", async ({ page }) => {
      const checkbox = page.getByRole("checkbox");
      await expect(checkbox).toBeChecked();
      await page.locator("label").click();
      await expect(checkbox).not.toBeChecked();
      await expect(page).toHaveScreenshot();
    });

    test("Can be enabled", async ({ page }) => {
      const checkbox = page.getByRole("checkbox");
      await expect(checkbox).toBeChecked();
      await page.locator("label").click();
      await expect(checkbox).not.toBeChecked();
      await page.locator("label").click();
      await expect(checkbox).toBeChecked();
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe("ChatGPT link", () => {
    test("Opens in a new tab", async ({ context, page }) => {
      const pagePromise = context.waitForEvent("page");

      const link = page.getByRole("link", { name: "ChatGPT" });

      await link.click();

      const newPage = await pagePromise;

      expect(newPage.url()).toContain("https://chat.openai.com/");
    });
  });

  test.describe("English", () => {
    test.use({
      locale: "en",
    });

    test("Renders successfully", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "ChatGPT RTL" }),
      ).toBeVisible();
      await expect(
        page.getByText(
          "Automatically detects and align right-to-left texts in ChatGPT.",
        ),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Settings" }),
      ).toBeVisible();
      await expect(page.getByText("Enable RTL texts auto align")).toBeVisible();
      await expect(
        page.getByText(
          "Enable or disable automatically right-to-left texts detection.",
        ),
      ).toBeVisible();
    });

    test("To have screen shot", async ({ page }) => {
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe("Arabic", () => {
    test.use({
      locale: "ar",
    });

    test("Renders successfully", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "ChatGPT من اليمين الى اليسار" }),
      ).toBeVisible();
      await expect(
        page.getByText(
          "ترقيم الصفحات ومحاذاة النص العربي تلقائيًا في ChatGPT.",
        ),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "إعدادات" }),
      ).toBeVisible();
      await expect(
        page.getByText("تفعيل المحاذاة التلقائية للغة العربية"),
      ).toBeVisible();
      await expect(
        page.getByText(
          "تمكين أو تعطيل المحاذاة التلقائية من اليمين إلى اليسار للنص العربي.",
        ),
      ).toBeVisible();
    });

    test("To have screen shot", async ({ page }) => {
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe("Hebrew", () => {
    test.use({
      locale: "he",
    });

    test("Renders successfully", async ({ page }) => {
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

    test("To have screen shot", async ({ page }) => {
      await expect(page).toHaveScreenshot();
    });
  });
});
