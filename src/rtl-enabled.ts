import { toggleRTLEnabled } from "./rtl";
import { appendRTLEnabledCheckbox } from "./rtl-enabled-checkbox";
import { getRTLEnabledValue, setRTLEnabledValue } from "./storage";
import { isHTMLElement } from "./utils";

function onRTLEnabledChange({ enabled }: { enabled: boolean }): void {
  setRTLEnabledValue(enabled);
  toggleRTLEnabled({ enabled });
}

export function initRTLEnabled(): void {
  const enabled = getRTLEnabledValue();
  toggleRTLEnabled({ enabled });
}

export function initRTLEnabledCheckbox(mutations: MutationRecord[]): void {
  const generalSettingsPanel = mutations
    .flatMap(({ addedNodes }) => Array.from(addedNodes))
    .filter(isHTMLElement)
    .map((node) => node.querySelector('div[id$="content-General"] > div'))
    .find(Boolean);

  if (generalSettingsPanel == null) return;

  const enabled = getRTLEnabledValue();

  appendRTLEnabledCheckbox({
    generalSettingsPanel,
    enabled,
    onChange: ({ checked }) => {
      onRTLEnabledChange({ enabled: checked });
    },
  });
}
