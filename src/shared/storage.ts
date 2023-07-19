const switchInputStorageKey = "chat-gpt-rtl-enabled";

export async function getRTLEnabledValue(): Promise<boolean> {
  return await new Promise((resolve) => {
    chrome.storage.local.get([switchInputStorageKey], (result) => {
      resolve(!(result[switchInputStorageKey] === "false"));
    });
  });
}

export async function setRTLEnabledValue(enabled: boolean): Promise<void> {
  await new Promise<void>((resolve) => {
    chrome.storage.local.set(
      { [switchInputStorageKey]: enabled.toString() },
      () => {
        resolve();
      },
    );
  });
}
