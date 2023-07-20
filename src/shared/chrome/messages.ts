async function getCurrentActiveTab(): Promise<chrome.tabs.Tab | undefined> {
  return await new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
      resolve(currentTab);
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
  const currentTab = await getCurrentActiveTab();
  sendMessageToTab(currentTab, message);
}
