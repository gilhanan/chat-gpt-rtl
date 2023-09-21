import "./popup";
import * as utils from "../shared/utils";
import * as rtlEnabledStorage from "../shared/rtl-enabled-storage";
import { sendToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";

jest.mock("../shared/toggle-rtl-message");
jest.mock("../shared/rtl-enabled-storage");

async function dispatchDOMContentLoaded(): Promise<void> {
  const event = new Event("DOMContentLoaded");
  document.dispatchEvent(event);

  while (document.body.children.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

describe("popup", () => {
  beforeEach(() => {
    document.dir = "";
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should render when DOMContentLoaded event is triggered", async () => {
    expect(document.body.children.length).toBe(0);

    await dispatchDOMContentLoaded();

    expect(document.body.children.length).toBeGreaterThan(0);
  });

  it.each([["rtl"], ["ltr"]])(
    "should set document direction to %s",
    async (direction) => {
      expect(document.dir).toBe("");

      (utils.getDirection as jest.Mock) = jest.fn().mockReturnValue(direction);

      await dispatchDOMContentLoaded();

      expect(document.dir).toBe(direction);
    },
  );

  it.each([[true], [false]])(
    "should render checkbox when enabled is %s",
    async (enabled) => {
      (rtlEnabledStorage.getRTLEnabledValue as jest.Mock) = jest
        .fn()
        .mockReturnValue(enabled);

      await dispatchDOMContentLoaded();

      const checkbox = document.getElementById(
        "switch-container-input",
      ) as HTMLInputElement;

      expect(checkbox.checked).toBe(enabled);
    },
  );

  it.each([[true], [false]])(
    "should call sendToggleRTLGlobalMessage on settings change when enabled is %s",
    async (enabled) => {
      (rtlEnabledStorage.getRTLEnabledValue as jest.Mock) = jest
        .fn()
        .mockReturnValue(enabled);

      await dispatchDOMContentLoaded();

      const checkbox = document.getElementById("switch-container-input");
      checkbox?.click();

      expect(sendToggleRTLGlobalMessage).toHaveBeenCalledTimes(1);
      expect(sendToggleRTLGlobalMessage).toHaveBeenCalledWith({
        enabled: !enabled,
      });
    },
  );
});
