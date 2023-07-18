const switchInputStorageKey = "chat-gpt-rtl-switch-input";

export function getCheckedValue(): boolean {
  return localStorage.getItem(switchInputStorageKey) === "true";
}

export function setCheckedValue({ checked }: { checked: boolean }): void {
  localStorage.setItem(switchInputStorageKey, checked.toString());
}
