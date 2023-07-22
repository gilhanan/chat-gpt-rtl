import "expect-puppeteer";
import fs from "fs";
import path from "path";
import puppeteer, {
  type ElementHandle,
  type Browser,
  type Page,
} from "puppeteer";

const inputId = "switch-container";
const inputSelector = `#${inputId}`;

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../dist/manifest.json"), "utf-8"),
);

const extensionId: string = manifest.id;

const popupURL = `chrome-extension://${extensionId}/popup/popup.html`;

describe("Popup", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${path.resolve(__dirname, "../dist")}`,
        `--load-extension=${path.resolve(__dirname, "../dist")}`,
      ],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  test("renders successfully", async () => {
    await page.goto(popupURL);
    await page.waitForSelector("body *");

    await expect(page).toMatchTextContent("ChatGPT RTL");
    await expect(page).toMatchTextContent(
      "Automatically detects and switches to right-to-left text direction in chat inputs.",
    );
    await expect(page).toMatchTextContent("Settings");
    await expect(page).toMatchTextContent("Enable automatic RTL detection");
    await expect(page).toMatchTextContent(
      "Enable or disable automatic right-to-left text detection.",
    );
    await expect(page).toMatchElement(inputSelector);

    const checkboxElement = (await page.$(
      inputSelector,
    )) as ElementHandle<HTMLInputElement>;

    const initialIsChecked = await (
      await checkboxElement.getProperty("checked")
    ).jsonValue();

    expect(initialIsChecked).toBe(true);
  });
});
