import { getRTLEnabledValue } from "../../shared/rtl-enabled-storage";
import { isHTMLElement } from "../../shared/dom";
import { toggleRTLGlobal } from "../rtl-utils";
import { appendRTLEnabledCheckbox } from "./rtl-toggle-setting-checkbox";

export async function initRTLEnabled(): Promise<void> {
  const enabled = await getRTLEnabledValue();
  toggleRTLGlobal({ enabled });
}

export async function initRTLEnabledCheckbox(
  mutations: MutationRecord[],
): Promise<void> {
  const generalSettingsPanel = mutations
    .flatMap(({ addedNodes }) => Array.from(addedNodes))
    .filter(isHTMLElement)
    .map((node) => node.querySelector('div[id$="content-General"] > div'))
    .find(Boolean);

  if (generalSettingsPanel == null) return;

  const enabled = await getRTLEnabledValue();

  appendRTLEnabledCheckbox({
    generalSettingsPanel,
    enabled,
    onChange: ({ checked }) => {
      toggleRTLGlobal({ enabled: checked });
    },
  });
}
