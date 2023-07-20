import * as messages from "./chrome/messages";
import {
  isToggleRTLGlobalMessage,
  sendToggleRTLGlobalMessage,
} from "./toggle-rtl-message";

const action = "ToggleRTLGlobal";

describe("isToggleRTLGlobalMessage", () => {
  it("should return true for a valid message", () => {
    expect(
      isToggleRTLGlobalMessage({
        action,
      }),
    ).toBe(true);
  });

  it("should return false for an invalid message", () => {
    expect(
      isToggleRTLGlobalMessage({
        action: "InvalidAction",
      }),
    ).toBe(false);
  });

  it("should return false for a null message", () => {
    expect(isToggleRTLGlobalMessage(null)).toBe(false);
  });
});

describe("sendToggleRTLGlobalMessage", () => {
  let sendMessageMock: jest.SpyInstance;

  beforeEach(() => {
    sendMessageMock = jest
      .spyOn(messages, "sendMessage")
      .mockImplementation(jest.fn());
  });

  it("should send a message when enabled is 'true'", async () => {
    const enabled = true;
    await sendToggleRTLGlobalMessage({ enabled });

    expect(sendMessageMock).toHaveBeenCalledWith({
      action,
      enabled,
    });
  });

  it("should send a message when enabled is 'false'", async () => {
    const enabled = false;
    await sendToggleRTLGlobalMessage({ enabled });

    expect(sendMessageMock).toHaveBeenCalledWith({
      action,
      enabled,
    });
  });
});
