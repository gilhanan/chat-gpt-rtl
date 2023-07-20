export async function getValue<T>({ key }: { key: string }): Promise<T> {
  return await new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result[key]);
    });
  });
}

export async function setValue({
  key,
  value,
}: {
  key: string;
  value: string;
}): Promise<void> {
  await new Promise<void>((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => {
      resolve();
    });
  });
}
