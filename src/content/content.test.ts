import { type ToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";
import { type ObserveChanges, type ObserveChangesOnce } from "./observers";

jest.mock("./observers");

describe("content script", () => {
  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = "";
  });

  it.each([true, false])(
    "initializes RTL enabled setting when value is %s",
    async (enabled) => {
      jest.mock("../shared/rtl-enabled-storage", () => ({
        getRTLEnabledValue: jest.fn().mockResolvedValue(enabled),
      }));

      const toggleRTLGlobal = jest.fn();

      jest.mock("./rtl-utils", () => ({
        toggleRTLGlobal,
      }));

      await import("./content");

      expect(toggleRTLGlobal).toHaveBeenCalledTimes(1);
      expect(toggleRTLGlobal).toHaveBeenCalledWith({ enabled });
    },
  );

  it.each([true, false])(
    "calls toggleRTLGlobal when receiving a valid toggle message with enabled set to %s",
    async (enabled) => {
      let onMessageCallback: (
        message: ToggleRTLGlobalMessage,
      ) => void = () => {};

      const addListener = jest.fn((callback) => (onMessageCallback = callback));

      global.chrome.runtime.onMessage.addListener = addListener;

      const toggleRTLGlobal = jest.fn();

      jest.mock("./rtl-utils", () => ({
        toggleRTLGlobal,
      }));

      await import("./content");

      toggleRTLGlobal.mockReset();

      onMessageCallback({
        action: "ToggleRTLGlobal",
        enabled,
      });

      expect(toggleRTLGlobal).toHaveBeenCalledTimes(1);
      expect(toggleRTLGlobal).toHaveBeenLastCalledWith({ enabled });
    },
  );

  it.each([undefined, null, "some-other-action"])(
    "does not call toggleRTLGlobal when receiving an invalid toggle message",
    async (action: unknown) => {
      let onMessageCallback: (
        message: ToggleRTLGlobalMessage,
      ) => void = () => {};

      const addListener = jest.fn((callback) => (onMessageCallback = callback));

      global.chrome.runtime.onMessage.addListener = addListener;

      const toggleRTLGlobal = jest.fn();

      jest.mock("./rtl-utils", () => ({
        toggleRTLGlobal,
      }));

      await import("./content");

      toggleRTLGlobal.mockReset();

      onMessageCallback({
        action: action as ToggleRTLGlobalMessage["action"],
        enabled: true,
      });

      expect(toggleRTLGlobal).toHaveBeenCalledTimes(0);
    },
  );

  describe("ObserveChanges", () => {
    let observeChanges: jest.MockedFunction<ObserveChanges>;
    let observeChangesOnce: jest.MockedFunction<ObserveChangesOnce>;

    beforeEach(async () => {
      observeChanges = jest.fn();
      observeChangesOnce = jest.fn();

      jest.mock("./observers", () => ({
        observeChanges,
        observeChangesOnce,
      }));

      await import("./content");
    });

    it("call observeChanges with correct arguments", async () => {
      expect(observeChanges).toHaveBeenCalledTimes(1);
      expect(observeChanges).toHaveBeenCalledWith({
        target: document.body,
        options: {
          childList: true,
          subtree: true,
        },
        callback: expect.any(Function),
      });
    });

    it("should not call observeChangesOnce when main is not exists", () => {
      observeChanges.mock.calls[0][0].callback(null as any, null as any);

      expect(observeChangesOnce).toHaveBeenCalledTimes(0);
    });

    it("should call observeChangesOnce when main is exists", () => {
      const main = document.createElement("main");
      document.body.append(main);

      observeChanges.mock.calls[0][0].callback(null as any, null as any);

      expect(observeChangesOnce).toHaveBeenCalledTimes(1);
      expect(observeChangesOnce).toHaveBeenCalledWith({
        target: main,
        options: {
          childList: true,
          subtree: true,
          characterData: true,
        },
        callback: expect.any(Function),
      });
    });
  });

  it("should call applyRTLToMutations when observeChangesOnce callback is called", async () => {
    const observeChanges: jest.MockedFunction<ObserveChanges> = jest.fn();
    const observeChangesOnce: jest.MockedFunction<ObserveChangesOnce> =
      jest.fn();
    const applyRTLToMutations: jest.Mock = jest.fn();

    jest.mock("./observers", () => ({
      observeChanges,
      observeChangesOnce,
    }));

    jest.mock("./rtl-utils", () => ({
      toggleRTLGlobal: jest.fn(),
      applyRTLToMutations,
    }));

    await import("./content");

    const main = document.createElement("main");
    document.body.append(main);

    const mutationRecord = Math.random() as unknown as MutationRecord;

    observeChanges.mock.calls[0][0].callback(null as any, null as any);
    observeChangesOnce.mock.calls[0][0].callback([mutationRecord], null as any);

    expect(applyRTLToMutations).toHaveBeenCalledTimes(1);
    expect(applyRTLToMutations).toHaveBeenCalledWith([mutationRecord]);
  });
});
