import { getRTLEnabledValue } from "../../shared/rtl-enabled-storage";
import { isHTMLElement } from "../../shared/dom";
import { toggleRTLGlobal } from "../rtl-utils";
import { createRTLToggleSetting } from "../rtl-toggle-setting-checkbox";

function getGeneralSettingsPanel(
  mutations: MutationRecord[],
): Element | undefined | null {
  return mutations
    .flatMap(({ addedNodes }) => Array.from(addedNodes))
    .filter(isHTMLElement)
    .map((node) => node.querySelector('div[id$="content-General"] > div'))
    .find(Boolean);
}

export async function initRTLEnabledCheckbox(
  mutations: MutationRecord[],
): Promise<void> {
  const generalSettingsPanel = getGeneralSettingsPanel(mutations);

  if (generalSettingsPanel == null) return;

  const enabled = await getRTLEnabledValue();

  const rtlToggleSetting = createRTLToggleSetting({
    enabled,
    onChange: ({ checked }) => {
      toggleRTLGlobal({ enabled: checked });
    },
  });

  generalSettingsPanel.append(rtlToggleSetting);
}
