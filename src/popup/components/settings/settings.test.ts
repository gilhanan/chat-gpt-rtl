import { createSettingsContainer } from "./settings";

describe("createSettingsContainer", () => {
  it.each([
    { initialState: true, expectedState: true },
    { initialState: false, expectedState: false },
  ])(
    "should create a settings container with a heading and a toggle switch setting row",
    async ({ initialState, expectedState }) => {
      const container = await createSettingsContainer({
        enabled: initialState,
        onChanged: jest.fn(),
      });

      expect(container).toBeDefined();

      const heading = container.querySelector("h3");
      expect(heading).toBeDefined();
      expect(heading?.textContent).toBe("settings");

      const toggleSwitch = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement;

      expect(toggleSwitch).toBeDefined();
      expect(toggleSwitch.checked).toBe(expectedState);
    },
  );

  it.each([
    { initialState: true, expectedState: false },
    { initialState: false, expectedState: true },
  ])(
    "should call the onChanged callback when the toggle switch is changed",
    async ({ initialState, expectedState }) => {
      const onChanged = jest.fn();

      const container = await createSettingsContainer({
        enabled: initialState,
        onChanged,
      });

      const toggleSwitch = container.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement;

      toggleSwitch.click();
      toggleSwitch.dispatchEvent(new Event("change"));

      expect(onChanged).toHaveBeenCalledTimes(1);
      expect(onChanged).toHaveBeenCalledWith({ checked: expectedState });
    },
  );
});
