export function createDiv({
  className = "",
  textContent = "",
}: {
  className?: string;
  textContent?: string;
}): HTMLDivElement {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = textContent;

  return div;
}

export function createSpan({
  state,
  className,
}: {
  state: string;
  className: string;
}): HTMLSpanElement {
  const span = document.createElement("span");
  span.dataset.state = state;
  span.className = className;
  return span;
}

export function createButton({
  className,
  value,
  role,
}: {
  className: string;
  value: string;
  role: string;
}): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.value = value;
  button.role = role;
  return button;
}
