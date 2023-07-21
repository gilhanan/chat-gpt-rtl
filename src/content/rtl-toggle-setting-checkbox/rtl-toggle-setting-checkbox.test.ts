import { createRTLToggleSetting } from "./rtl-toggle-setting-checkbox";

it.each([
  { enabled: true, expected: true },
  { enabled: false, expected: false },
])(
  "should append an RTL enabled checkbox to the panel with correct initial state",
  ({ enabled, expected }) => {
    const rtlToggleSetting = createRTLToggleSetting({
      enabled,
      onChange: jest.fn(),
    });

    const checkbox = rtlToggleSetting.querySelector(
      "button",
    ) as HTMLButtonElement;

    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute("aria-checked") === "true").toBe(expected);
  },
);

it.each([
  { enabled: true, expected: false },
  { enabled: false, expected: true },
])(
  "should call onChange with correct checked value when the checkbox is clicked",
  ({ enabled, expected }) => {
    const onChange = jest.fn();

    const rtlToggleSetting = createRTLToggleSetting({
      enabled,
      onChange,
    });

    const checkbox = rtlToggleSetting.querySelector(
      "button",
    ) as HTMLButtonElement;

    checkbox.click();
    dispatchEvent(new Event("click"));

    expect(onChange).toHaveBeenCalledWith({ checked: expected });
    expect(checkbox.getAttribute("aria-checked") === "true").toBe(expected);
  },
);
