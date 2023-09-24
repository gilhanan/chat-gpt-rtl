export function createLabel({
  className,
  htmlFor,
  textContent = "",
}: {
  className: string;
  htmlFor: string;
  textContent?: string;
}): HTMLLabelElement {
  const label = document.createElement("label");
  label.className = className;
  label.htmlFor = htmlFor;
  label.textContent = textContent;
  return label;
}

export function createHeading({
  tagName,
  className,
  textContent,
}: {
  tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className: string;
  textContent: string;
}): HTMLHeadingElement {
  const heading = document.createElement(tagName);
  heading.className = className;
  heading.textContent = textContent;
  return heading;
}

export function createHeader({
  className,
}: {
  className: string;
}): HTMLElement {
  const header = document.createElement("header");
  header.className = className;
  return header;
}

export function createMain(): HTMLElement {
  const main = document.createElement("main");
  return main;
}

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
  className,
  state,
}: {
  className: string;
  state?: string;
}): HTMLSpanElement {
  const span = document.createElement("span");
  span.className = className;

  if (state !== undefined) {
    span.dataset.state = state;
  }

  return span;
}

export function createAnchor({
  className,
  href,
  textContent,
  ariaLabel,
  target = "_blank",
  rel = "noopener noreferrer",
}: {
  className: string;
  href: string;
  textContent: string;
  ariaLabel: string;
  target?: "_blank" | "_self";
  rel?: "noopener noreferrer";
}): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.className = className;
  anchor.href = href;
  anchor.textContent = textContent;
  anchor.ariaLabel = ariaLabel;
  anchor.target = target;
  anchor.rel = rel;
  return anchor;
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

export function createCheckbox({
  id,
  checked,
  ariaLabel,
}: {
  id: string;
  checked: boolean;
  ariaLabel: string;
}): HTMLInputElement {
  const checkBox = createInput({ id, type: "checkbox" });
  checkBox.checked = checked;
  checkBox.ariaLabel = ariaLabel;
  return checkBox;
}

export function createInput({
  id,
  type,
}: {
  id: string;
  type: "checkbox" | "radio" | "text";
}): HTMLInputElement {
  const input = document.createElement("input");
  input.id = id;
  input.type = type;
  return input;
}
