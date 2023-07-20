import { createButton, createDiv, createSpan } from "../../shared/dom";

type SwitchInputOnChange = ({ checked }: { checked: boolean }) => void;

function createSwitchButtonToggle({
  enabled,
}: {
  enabled: boolean;
}): HTMLSpanElement {
  return createSpan({
    state: enabled ? "checked" : "unchecked",
    className:
      "block h-[21px] w-[21px] rounded-full translate-x-0.5 transition-transform duration-100 will-change-transform radix-state-checked:translate-x-[19px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.45)]",
  });
}

function createSwitchButton({
  enabled,
  onChange,
  className,
}: {
  enabled: boolean;
  onChange: SwitchInputOnChange;
  className: string;
}): HTMLButtonElement {
  const buttonToggle = createSwitchButtonToggle({ enabled });

  const button = createButton({ value: "on", className, role: "switch" });
  button.role = "switch";
  button.setAttribute("aria-checked", enabled ? "true" : "false");
  button.dataset.state = enabled ? "checked" : "unchecked";
  button.setAttribute("aria-label", "Auto Right to Left");

  button.addEventListener("click", () => {
    const checked = !(button.getAttribute("aria-checked") === "true");

    button.setAttribute("aria-checked", checked ? "true" : "false");
    button.dataset.state = checked ? "checked" : "unchecked";
    buttonToggle.dataset.state = checked ? "checked" : "unchecked";

    onChange({
      checked,
    });
  });

  button.appendChild(buttonToggle);
  return button;
}

function createRTLEnabledContainer({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: SwitchInputOnChange;
}): HTMLElement {
  const settingContainer = createDiv({
    className: "border-b pb-3 dark:border-gray-700",
  });

  const settingRow = createDiv({
    className: "flex items-center justify-between",
  });

  const buttonContainer = createDiv({
    textContent: "Auto Right to Left",
  });

  const button = createSwitchButton({
    enabled,
    onChange,
    className:
      "bg-gray-200 radix-state-checked:bg-green-600 h-[25px] w-[42px] cursor-pointer rounded-full",
  });

  settingRow.append(buttonContainer, button);
  settingContainer.appendChild(settingRow);

  return settingContainer;
}

export function appendRTLEnabledCheckbox({
  generalSettingsPanel,
  enabled,
  onChange,
}: {
  generalSettingsPanel: Element;
  enabled: boolean;
  onChange: SwitchInputOnChange;
}): void {
  const switchContainer = createRTLEnabledContainer({ enabled, onChange });
  generalSettingsPanel.append(switchContainer);
}
