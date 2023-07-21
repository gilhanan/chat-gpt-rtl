import { setRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { containsRTL } from "../shared/utils";
import {
  filterHTMLElements,
  isHTMLTextAreaElement,
  queryHTMLElements,
  toggleClass,
} from "../shared/dom";

function isRTLApplicable(text: string): boolean {
  return Boolean(text) && containsRTL(text);
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
    selector: "p, ol, ul, div:not(:has(*))",
  })
    .filter(({ innerText }) => isRTLApplicable(innerText))
    .forEach(enableRTLElement);
}

export function applyRTLToMutations(mutations: MutationRecord[]): void {
  mutations.forEach(({ type, addedNodes, target }) => {
    const { nodeType, parentElement } = target;

    if (type === "childList") {
      if (isHTMLTextAreaElement(target)) {
        toggleRTLElement({
          element: target,
          enabled: isRTLApplicable(target.value),
        });
      } else {
        filterHTMLElements(addedNodes).forEach(applyRTLToChildrens);
      }
    }

    if (
      type === "characterData" &&
      nodeType === Node.TEXT_NODE &&
      parentElement !== null &&
      isRTLApplicable(parentElement.innerText)
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
