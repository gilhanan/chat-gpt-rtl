import { test, expect } from "./fixture";

test("renders successfully", async ({ page, extensionId }) => {
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

  const checkbox = page.getByRole("checkbox");
  await expect(checkbox).toBeChecked();
  await page.locator("label").click();
  await expect(checkbox).not.toBeChecked();
});
