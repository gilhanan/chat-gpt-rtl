import { createSettingsContainer } from "./settings";

describe("createSettingsContainer", () => {
  describe("rendering", () => {
    let settingsContainer: HTMLDivElement;

    beforeEach(async () => {
      settingsContainer = await createSettingsContainer({
        enabled: true,
        onChanged: jest.fn(),
      });
    });

    it("should render title", async () => {
      const { textContent } =
        settingsContainer.getElementsByClassName("text-lg")[0];
      expect(textContent).toBe("settings");
    });

    it("should render toggle switch", async () => {
      const toggleSwitch = settingsContainer.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement;

      expect(toggleSwitch).toBeDefined();
    });

    it("should render toggle switch label", async () => {
      const { textContent } =
        settingsContainer.getElementsByClassName("switch-container")[0];
      expect(textContent).toBe("toggleSwitchLabel");
    });

    it("should render toggle switch description", async () => {
      const { textContent } =
        settingsContainer.getElementsByClassName("text-xs")[0];
      expect(textContent).toBe("toggleSwitchDescription");
    });
  });

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
