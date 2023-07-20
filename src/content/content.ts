import "./content.scss";
import {
  filterHTMLElements,
  isHTMLTextAreaElement,
  queryHTMLElements,
} from "../shared/dom";
import {
  toggleRTLElement,
  isRTLApplicable,
  enableRTLElement,
  toggleRTLGlobal,
} from "./rtl";
import { observeChanges, observeChangesOnce } from "./observers";
import { initRTLEnabled, initRTLEnabledCheckbox } from "./rtl-toggle-setting";
import { isToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";

function applyRTLToChildrens(element: HTMLElement): void {
  queryHTMLElements({
    element,
    selector: "p, ol, ul, div:not(:has(*))",
  })
    .filter(({ innerText }) => isRTLApplicable(innerText))
    .forEach(enableRTLElement);
}

function applyRTLToMutations(mutations: MutationRecord[]): void {
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

const mainObserverCallback: MutationCallback = (mutations) => {
  applyRTLToMutations(mutations);
};

function observeMainChanges(): void {
  const main = document.querySelector("main");

  if (main === null) return;

  observeChangesOnce({
    target: main,
    options: {
      childList: true,
      subtree: true,
      characterData: true,
    },
    callback: mainObserverCallback,
  });
}

const documentObserverCallback: MutationCallback = (mutations) => {
  void initRTLEnabledCheckbox(mutations);
  observeMainChanges();
};

chrome.runtime.onMessage.addListener((message) => {
  if (isToggleRTLGlobalMessage(message)) {
    const { enabled } = message;
    toggleRTLGlobal({ enabled });
  }
});

void initRTLEnabled();

observeChanges({
  target: document.body,
  options: {
    childList: true,
    subtree: true,
  },
  callback: documentObserverCallback,
});
