async function getActiveTabs(): Promise<chrome.tabs.Tab[]> {
  return await new Promise((resolve) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      resolve(tabs);
    });
  });
}

function sendMessageToTab<T>(
  tab: chrome.tabs.Tab | undefined,
  message: T,
): void {
  if (tab?.id !== undefined) {
    void chrome.tabs.sendMessage(tab.id, message);
  }
}

export async function sendMessage<T>(message: T): Promise<void> {
  const tabs = await getActiveTabs();
  tabs.forEach((tab) => {
    sendMessageToTab(tab, message);
  });
}
