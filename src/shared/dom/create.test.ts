import {
  createLabel,
  createHeading,
  createDiv,
  createSpan,
  createButton,
  createCheckbox,
  createInput,
} from "./create";

describe("createLabel", () => {
  test("should create a label element with the provided properties", () => {
    const label = createLabel({
      className: "my-label",
      htmlFor: "my-input",
      textContent: "Label Text",
    });

    expect(label.tagName).toBe("LABEL");
    expect(label.className).toBe("my-label");
    expect(label.htmlFor).toBe("my-input");
    expect(label.textContent).toBe("Label Text");
  });
});

describe("createHeading", () => {
  test("should create a heading element with the provided properties", () => {
    const heading = createHeading({
      tagName: "h1",
      className: "my-heading",
      textContent: "Heading Text",
    });

    expect(heading.tagName).toBe("H1");
    expect(heading.className).toBe("my-heading");
    expect(heading.textContent).toBe("Heading Text");
  });
});

describe("createDiv", () => {
  test("should create a div element with the provided properties", () => {
    const div = createDiv({
      className: "my-div",
      textContent: "Div Text",
    });

    expect(div.tagName).toBe("DIV");
    expect(div.className).toBe("my-div");
    expect(div.textContent).toBe("Div Text");
  });
});

describe("createSpan", () => {
  test("should create a span element with the provided properties", () => {
    const span = createSpan({
      className: "my-span",
      state: "active",
    });

    expect(span.tagName).toBe("SPAN");
    expect(span.className).toBe("my-span");
    expect(span.dataset.state).toBe("active");
  });

  test("should create a span element without state if not provided", () => {
    const span = createSpan({
      className: "my-span",
    });

    expect(span.tagName).toBe("SPAN");
    expect(span.className).toBe("my-span");
    expect(span.dataset.state).toBeUndefined();
  });
});

describe("createButton", () => {
  test("should create a button element with the provided properties", () => {
    const button = createButton({
      className: "my-button",
      value: "Click Me",
      role: "button",
    });

    expect(button.tagName).toBe("BUTTON");
    expect(button.className).toBe("my-button");
    expect(button.value).toBe("Click Me");
    expect(button.role).toBe("button");
    expect(button.type).toBe("button");
  });
});

describe("createCheckbox", () => {
  test("should create a checkbox input element with the provided properties", () => {
    const checkbox = createCheckbox({
      id: "my-checkbox",
      checked: true,
    });

    expect(checkbox.tagName).toBe("INPUT");
    expect(checkbox.id).toBe("my-checkbox");
    expect(checkbox.type).toBe("checkbox");
    expect(checkbox.checked).toBe(true);
  });
});

describe("createInput", () => {
  test("should create an input element with the provided properties", () => {
    const input = createInput({
      id: "my-input",
      type: "text",
    });

    expect(input.tagName).toBe("INPUT");
    expect(input.id).toBe("my-input");
    expect(input.type).toBe("text");
  });
});
