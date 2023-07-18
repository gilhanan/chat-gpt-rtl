import {
  containsRTL,
  filterHTMLElements,
  isHTMLTextAreaElement,
  queryHTMLElements,
  toggleClass,
} from "./utils";

const rtlClass = "chat-gpt-rtl";

export function toggleRTLEnabled({ enabled }: { enabled: boolean }): void {
  toggleClass({
    element: document.body,
    className: "chat-gpt-rtl-enabled",
    enabled,
  });
}

function getRTLElements(element: HTMLElement): HTMLElement[] {
  return queryHTMLElements({
    element,
    selector: "p, ol, ul, div:not(:has(*))",
  }).filter(({ innerText }) => isRTLApplicable(innerText));
}

function isRTLApplicable(text: string): boolean {
  return Boolean(text) && containsRTL(text);
}

function addRTLClass(element: HTMLElement): void {
  toggleClass({ element, className: rtlClass, enabled: true });
}

function applyRTLToChildrens(element: HTMLElement): void {
  getRTLElements(element).forEach(addRTLClass);
}

export function applyRTLToMutations(mutations: MutationRecord[]): void {
  mutations.forEach(({ type, addedNodes, target }) => {
    const { nodeType, parentElement } = target;

    if (type === "childList") {
      if (isHTMLTextAreaElement(target)) {
        toggleClass({
          element: target,
          className: rtlClass,
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
      addRTLClass(parentElement);
    }
  });
}
