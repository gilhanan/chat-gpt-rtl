import "./popup.scss";
import { getRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { sendToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";
import { createDiv, createHeading } from "../shared/dom";
import { createToggleSwitch } from "./toggle-switch/toggle-switch";

async function createToggleSwitchSettingRow(): Promise<HTMLDivElement> {
  const enabled = await getRTLEnabledValue();

  const settingRow = createDiv({
    className: "p-3",
  });

  const toggleSwitch = createToggleSwitch({
    textContent: "Enable automatic RTL detection",
    checked: enabled,
    onChanged: ({ checked }) => {
      void sendToggleRTLGlobalMessage({
        enabled: checked,
      });
    },
  });

  const toggleSwitchDescription = createDiv({
    className: "mt-2 text-xs text-gray-500",
    textContent: "Enable or disable automatic right-to-left text detection.",
  });

  settingRow.append(toggleSwitch, toggleSwitchDescription);

  return settingRow;
}

function createTitleContainer(): HTMLDivElement {
  const title = createHeading({
    tagName: "h2",
    className: "text-xl font-medium",
    textContent: "ChatGPT RTL",
  });

  const description = createDiv({
    className: "mt-2 text-sm text-gray-500",
    textContent:
      "Automatically detects and switches to right-to-left text direction in chat inputs.",
  });

  const container = createDiv({
    className: "p-3 border-b border-black/10",
  });

  container.append(title, description);

  return container;
}

async function render(): Promise<void> {
  const settings = createHeading({
    tagName: "h3",
    className: "p-3 text-lg font-medium border-b border-black/10",
    textContent: "Settings",
  });

  const titleContainer = createTitleContainer();

  const toggleSwitchSettingRow = await createToggleSwitchSettingRow();

  document.body.append(titleContainer, settings, toggleSwitchSettingRow);
}

document.addEventListener("DOMContentLoaded", function () {
  void render();
});
