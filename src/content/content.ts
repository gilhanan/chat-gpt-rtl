import "./content.scss";
import { isToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";
import { getRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { toggleRTLGlobal, applyRTLToMutations } from "./rtl-utils";
import { observeChanges, observeChangesOnce } from "./observers";
import { initRTLEnabledCheckbox } from "./rtl-toggle-setting";

async function initRTLEnabled(): Promise<void> {
  const enabled = await getRTLEnabledValue();
  toggleRTLGlobal({ enabled });
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
