import { setRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { containsRTL } from "../shared/utils";
import {
  isHTMLDivElement,
  isHTMLElement,
  isHTMLTextAreaElement,
  queryHTMLElements,
  toggleClass,
} from "../shared/dom";

function isRTLApplicable(text: string | null): boolean {
  return !!(text && containsRTL(text));
}

function toggleRTLElement({
  element,
  enabled,
}: {
  element: HTMLElement;
  enabled: boolean;
}): void {
  toggleClass({ element, className: "chat-gpt-rtl", enabled });
}

function enableRTLElement(element: HTMLElement): void {
  toggleRTLElement({ element, enabled: true });
}

function applyRTLToChildrens(element: HTMLElement): void {
  queryHTMLElements({
    element,
    selector: "p, ol, ul, div",
  })
    .filter(
      (element) => !isHTMLDivElement(element) || element.children.length === 0,
    )
    .filter(({ textContent }) => isRTLApplicable(textContent))
    .forEach(enableRTLElement);
}

export function applyRTLToMutations(mutations: MutationRecord[]): void {
  mutations.forEach(({ type, target }) => {
    const { nodeType, parentElement } = target;

    if (type === "childList") {
      if (isHTMLTextAreaElement(target)) {
        toggleRTLElement({
          element: target,
          enabled: isRTLApplicable(target.value),
        });
      } else if (isHTMLElement(target)) {
        applyRTLToChildrens(target);
      }
    }

    if (
      type === "characterData" &&
      nodeType === Node.TEXT_NODE &&
      parentElement !== null &&
      isRTLApplicable(parentElement.textContent)
    ) {
      enableRTLElement(parentElement);
    }
  });
}

export function toggleRTLGlobal({ enabled }: { enabled: boolean }): void {
  toggleClass({
    element: document.body,
    className: "chat-gpt-rtl-enabled",
    enabled,
  });
  void setRTLEnabledValue(enabled);
}
