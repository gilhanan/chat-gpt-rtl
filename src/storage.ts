const switchInputStorageKey = "chat-gpt-rtl-enabled";

export function getRTLEnabledValue(): boolean {
  return !(localStorage.getItem(switchInputStorageKey) === "false");
}

export function setRTLEnabledValue(enabled: boolean): void {
  localStorage.setItem(switchInputStorageKey, enabled.toString());
}
