/* eslint-disable no-empty-pattern */
import path from "path";
import fs from "fs";
import { test as base, chromium, type BrowserContext } from "@playwright/test";
import { signExtensionId } from "./extension-id";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({ locale }, use) => {
    await signExtensionId();

    const pathToExtension = path.join(__dirname, "../dist");
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        `--lang=${locale as string}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({}, use) => {
    const { id } = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, "../dist/manifest.json"),
        "utf-8",
      ),
    );

    await use(id);
  },
});

export const expect = test.expect;
