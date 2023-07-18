import {
  containsRTL,
  filterHTMLElements,
  queryHTMLElements,
  toggleClass,
} from "./utils";

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
  }).filter(isRTLApplicable);
}

function isRTLApplicable({ innerText }: HTMLElement): boolean {
  return Boolean(innerText) && containsRTL(innerText);
}

function addRTLClass({ classList }: HTMLElement): void {
  classList.add("chat-gpt-rtl");
}

function applyRTLToChildrens(element: HTMLElement): void {
  getRTLElements(element).forEach(addRTLClass);
}

export function applyRTLToMutations(mutations: MutationRecord[]): void {
  mutations.forEach(({ type, addedNodes, target }) => {
    if (type === "childList") {
      filterHTMLElements(addedNodes).forEach(applyRTLToChildrens);
    }

    if (
      type === "characterData" &&
      target?.parentElement != null &&
      isRTLApplicable(target.parentElement)
    ) {
      addRTLClass(target.parentElement);
    }
  });
}
