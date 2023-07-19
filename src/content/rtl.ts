import { setRTLEnabledValue } from "../shared/storage";
import { containsRTL, toggleClass } from "../shared/utils";

export function toggleRTLGlobal({ enabled }: { enabled: boolean }): void {
  toggleClass({
    element: document.body,
    className: "chat-gpt-rtl-enabled",
    enabled,
  });
  setRTLEnabledValue(enabled);
}

export function toggleRTLElement({
  element,
  enabled,
}: {
  element: HTMLElement;
  enabled: boolean;
}): void {
  toggleClass({ element, className: "chat-gpt-rtl", enabled });
}

export function enableRTLElement(element: HTMLElement): void {
  toggleRTLElement({ element, enabled: true });
}

export function isRTLApplicable(text: string): boolean {
  return Boolean(text) && containsRTL(text);
}
