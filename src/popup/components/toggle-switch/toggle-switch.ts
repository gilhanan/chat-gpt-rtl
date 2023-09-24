import "./toggle-switch.scss";
import {
  createDiv,
  createCheckbox,
  createSpan,
  createLabel,
} from "../../../shared/dom";

const inputId = "switch-container-input";

export function createToggleSwitch({
  checked,
  textContent,
  onChanged,
}: {
  checked: boolean;
  textContent: string;
  onChanged: (args: { checked: boolean }) => void;
}): HTMLDivElement {
  const container = createDiv({
    className:
      "switch-container flex items-center justify-between text-sm text-gray-600",
  });

  const title = createDiv({
    textContent,
  });

  const input = createCheckbox({
    id: inputId,
    checked,
    ariaLabel: textContent,
  });

  const span = createSpan({
    className: "slider round",
  });

  const label = createLabel({
    className: "switch",
    htmlFor: inputId,
  });

  label.append(input, span);
  container.append(title, label);

  input.addEventListener("change", () => {
    const { checked } = input;
    onChanged({ checked });
  });

  return container;
}
