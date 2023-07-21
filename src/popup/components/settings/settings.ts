import { createDiv, createHeading } from "../../../shared/dom";
import { createToggleSwitch } from "../toggle-switch";

type OnChanged = (event: { checked: boolean }) => void;

async function createToggleSwitchSettingRow({
  enabled,
  onChanged,
}: {
  enabled: boolean;
  onChanged: OnChanged;
}): Promise<HTMLDivElement> {
  const settingRow = createDiv({
    className: "p-3",
  });

  const toggleSwitch = createToggleSwitch({
    textContent: "Enable automatic RTL detection",
    checked: enabled,
    onChanged: ({ checked }) => {
      onChanged({ checked });
    },
  });

  const toggleSwitchDescription = createDiv({
    className: "mt-2 text-xs text-gray-500",
    textContent: "Enable or disable automatic right-to-left text detection.",
  });

  settingRow.append(toggleSwitch, toggleSwitchDescription);

  return settingRow;
}

export async function createSettingsContainer({
  enabled,
  onChanged,
}: {
  enabled: boolean;
  onChanged: OnChanged;
}): Promise<HTMLDivElement> {
  const container = createDiv({});

  const settingsHeading = createHeading({
    tagName: "h3",
    className: "p-3 text-lg font-medium border-b border-black/10",
    textContent: "Settings",
  });

  const toggleSwitchSettingRow = await createToggleSwitchSettingRow({
    enabled,
    onChanged,
  });

  container.append(settingsHeading, toggleSwitchSettingRow);

  return container;
}
