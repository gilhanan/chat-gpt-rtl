import { toggleRTLEnabled } from "./rtl";
import {
  appendRTLEnabledCheckbox,
  switchContainerClass,
} from "./rtl-enabled-checkbox";
import { getRTLEnabledValue, setRTLEnabledValue } from "./storage";

function getUninitilizedHeader(): HTMLElement | null {
  const header = document.querySelector("header");

  return header != null &&
    header.querySelector(`.${switchContainerClass}`) == null
    ? header
    : null;
}

function onRTLEnabledChange({ enabled }: { enabled: boolean }): void {
  setRTLEnabledValue(enabled);
  toggleRTLEnabled({ enabled });
}

export function initRTLEnabled(): void {
  const header = getUninitilizedHeader();

  if (header == null) return;

  const enabled = getRTLEnabledValue();

  toggleRTLEnabled({ enabled });
  appendRTLEnabledCheckbox({
    header,
    enabled,
    onChange: ({ checked }) => {
      onRTLEnabledChange({ enabled: checked });
    },
  });
}
