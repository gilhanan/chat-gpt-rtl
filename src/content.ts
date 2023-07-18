import { applyRTLToMutations } from "./rtl";
import { observeChangesOnce } from "./observers";
import { initRTLEnabled, initRTLEnabledCheckbox } from "./rtl-enabled";

const mainObserverCallback: MutationCallback = (mutations) => {
  applyRTLToMutations(mutations);
};

function observeMainChanges(): void {
  const main = document.querySelector("main");
  if (main == null) return;
  observeChangesOnce({ target: main, callback: mainObserverCallback });
}

function documentObserverCallback(): void {
  initRTLEnabledCheckbox();
  observeMainChanges();
}

initRTLEnabled();

observeChangesOnce({
  target: document.body,
  callback: documentObserverCallback,
});
