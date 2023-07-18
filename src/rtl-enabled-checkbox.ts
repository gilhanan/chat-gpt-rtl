const switchInputId = "chat-gpt-rtl-switch-input";
export const switchContainerClass = "chat-gpt-rtl-switch-container";

type SwitchInputOnChange = ({ checked }: { checked: boolean }) => void;

function createRTLEnabledCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: SwitchInputOnChange;
}): HTMLElement {
  const switchInput = document.createElement("input");
  switchInput.type = "checkbox";
  switchInput.id = switchInputId;
  switchInput.checked = checked;

  switchInput.addEventListener("change", ({ target }: Event) => {
    onChange({ checked: (target as HTMLInputElement).checked });
  });

  return switchInput;
}

function createRTLEnabledLabel(): HTMLElement {
  const switchLabel = document.createElement("label");
  switchLabel.innerHTML = "RTL enabled";
  switchLabel.htmlFor = switchInputId;
  return switchLabel;
}

function createRTLEnabledContainer({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: SwitchInputOnChange;
}): HTMLElement {
  const switchContainer = document.createElement("div");

  switchContainer.className = switchContainerClass;
  switchContainer.append(
    createRTLEnabledCheckbox({ checked: enabled, onChange }),
  );
  switchContainer.append(createRTLEnabledLabel());

  return switchContainer;
}

export function appendRTLEnabledCheckbox({
  header,
  enabled,
  onChange,
}: {
  header: HTMLElement;
  enabled: boolean;
  onChange: SwitchInputOnChange;
}): void {
  const switchContainer = createRTLEnabledContainer({ enabled, onChange });
  header.prepend(switchContainer);
}
