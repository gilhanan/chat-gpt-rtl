export enum MessageActions {
  ToggleRTLGlobal = "ToggleRTLGlobal",
}

export interface Message {
  action: MessageActions;
}

export interface ToggleRTLGlobalMessage extends Message {
  action: MessageActions.ToggleRTLGlobal;
  enabled: boolean;
}

export function isToggleRTLGlobalMessage(
  message: Message,
): message is ToggleRTLGlobalMessage {
  return message?.action === MessageActions.ToggleRTLGlobal;
}

export function sendMessage<T extends Message>(message: T): void {
  chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
    if (currentTab === undefined) {
      return;
    }

    void chrome.tabs.sendMessage(currentTab.id as number, message);
  });
}
