import { createToggleSwitch } from "./toggle-switch";

describe("createToggleSwitch", () => {
  it("should create a toggle switch with the correct text content", () => {
    const textContent = "Toggle Switch";
    const toggleSwitch = createToggleSwitch({
      checked: false,
      textContent,
      onChanged: jest.fn(),
    });

    const title = toggleSwitch.querySelector(".switch-container > div");

    expect(title?.textContent).toBe(textContent);
  });

  it.each([
    [{ checked: true }, "should create a toggle switch when checked is 'true'"],
    [
      { checked: false },
      "should create a toggle switch when checked is 'false'",
    ],
  ])("%s %s", ({ checked }) => {
    const toggleSwitch = createToggleSwitch({
      checked,
      textContent: "Toggle Switch",
      onChanged: jest.fn(),
    });

    const input = toggleSwitch.querySelector(
      "#switch-container-input",
    ) as HTMLInputElement;

    expect(input.checked).toBe(checked);
  });

  it.each([
    {
      initialState: false,
      finalState: true,
      description:
        "should call the onChanged callback when the toggle switch is changed from 'false' to 'true'",
    },
    {
      initialState: true,
      finalState: false,
      description:
        "should call the onChanged callback when the toggle switch is changed from 'true' to 'false'",
    },
  ])("%s", ({ initialState, finalState }) => {
    const onChanged = jest.fn();
    const toggleSwitch = createToggleSwitch({
      checked: initialState,
      textContent: "Toggle Switch",
      onChanged,
    });

    const input = toggleSwitch.querySelector(
      "#switch-container-input",
    ) as HTMLInputElement;

    input.click();
    input.dispatchEvent(new Event("change"));

    expect(onChanged).toHaveBeenCalledWith({ checked: finalState });
  });
});
