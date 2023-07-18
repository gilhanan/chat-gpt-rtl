import { appendCheckBox, switchContainerClass } from "./elements";
import { getCheckedValue, setCheckedValue } from "./storage";

function toggleRTLClass({ checked }: { checked: boolean }): void {
  const rtlClass = "chat-gpt-rtl";

  if (checked) {
    document.body.classList.add(rtlClass);
  } else {
    document.body.classList.remove(rtlClass);
  }
}

function onDirectionChange({ checked }: { checked: boolean }): void {
  setCheckedValue({ checked });
  toggleRTLClass({ checked });
}

function observerCallback(): void {
  const header = document.querySelector("header");

  if (header == null) {
    return;
  }

  if (header.querySelector(`.${switchContainerClass}`) != null) {
    return;
  }

  const checked = getCheckedValue();
  toggleRTLClass({ checked });
  appendCheckBox({ header, checked, onDirectionChange });
}

function observeChanges(): void {
  const observer = new MutationObserver(observerCallback);
  observer.observe(document, { childList: true, subtree: true });
}

observeChanges();
