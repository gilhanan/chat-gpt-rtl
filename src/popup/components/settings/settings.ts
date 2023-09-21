import { createDiv, createHeading } from "../../../shared/dom";
import { createToggleSwitch } from "../toggle-switch";

type OnChanged = (event: { checked: boolean }) => void;

function createToggleSwitchSettingRow({
  enabled,
  onChanged,
}: {
  enabled: boolean;
  onChanged: OnChanged;
}): HTMLDivElement {
  const settingRow = createDiv({
    className: "p-3",
  });

  const toggleSwitch = createToggleSwitch({
    textContent: chrome.i18n.getMessage("toggleSwitchLabel"),
    checked: enabled,
    onChanged: ({ checked }) => {
      onChanged({ checked });
    },
  });

  const toggleSwitchDescription = createDiv({
    className: "mt-2 text-xs text-gray-500",
    textContent: chrome.i18n.getMessage("toggleSwitchDescription"),
  });

  settingRow.append(toggleSwitch, toggleSwitchDescription);

  return settingRow;
}

export function createSettingsContainer({
  enabled,
  onChanged,
}: {
  enabled: boolean;
  onChanged: OnChanged;
}): HTMLDivElement {
  const container = createDiv({});

  const settingsHeading = createHeading({
    tagName: "h3",
    className: "p-3 text-lg font-medium border-b border-black/10",
    textContent: chrome.i18n.getMessage("settings"),
  });

  const toggleSwitchSettingRow = createToggleSwitchSettingRow({
    enabled,
    onChanged,
  });

  container.append(settingsHeading, toggleSwitchSettingRow);

  return container;
}
