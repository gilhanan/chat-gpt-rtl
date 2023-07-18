const switchInputId = "chat-gpt-rtl-switch-input";
export const switchContainerClass = "chat-gpt-rtl-switch-container";

function createSwitchInput({
  checked,
  onDirectionChange,
}: {
  checked: boolean;
  onDirectionChange: ({ checked }: { checked: boolean }) => void;
}): HTMLElement {
  const switchInput = document.createElement("input");
  switchInput.type = "checkbox";
  switchInput.id = switchInputId;
  switchInput.checked = checked;

  switchInput.addEventListener("change", ({ target }: Event) => {
    const { checked } = target as HTMLInputElement;
    onDirectionChange({ checked });
  });

  return switchInput;
}

function createSwitchLabel(): HTMLElement {
  const switchLabel = document.createElement("label");
  switchLabel.innerHTML = "Switch to RTL";
  switchLabel.htmlFor = switchInputId;
  return switchLabel;
}

function createSwitchContainer({
  checked,
  onDirectionChange,
}: {
  checked: boolean;
  onDirectionChange: ({ checked }: { checked: boolean }) => void;
}): HTMLElement {
  const switchContainer = document.createElement("div");

  switchContainer.className = switchContainerClass;
  switchContainer.append(createSwitchInput({ checked, onDirectionChange }));
  switchContainer.append(createSwitchLabel());

  return switchContainer;
}

export function appendCheckBox({
  header,
  checked,
  onDirectionChange,
}: {
  header: HTMLElement;
  checked: boolean;
  onDirectionChange: ({ checked }: { checked: boolean }) => void;
}): void {
  const switchContainer = createSwitchContainer({ checked, onDirectionChange });
  header.prepend(switchContainer);
}
