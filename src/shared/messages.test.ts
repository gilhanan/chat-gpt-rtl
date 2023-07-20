import {
  type ToggleRTLGlobalMessage,
  type Message,
  sendMessage,
  MessageActions,
  isToggleRTLGlobalMessage,
} from "./messages";

type QueryCallback = (result: chrome.tabs.Tab[]) => void;

const mockMessage: ToggleRTLGlobalMessage = {
  action: MessageActions.ToggleRTLGlobal,
  enabled: true,
};

describe("isToggleRTLGlobalMessage", () => {
  it("should return true if message is ToggleRTLGlobalMessage", () => {
    const message: ToggleRTLGlobalMessage = {
      action: MessageActions.ToggleRTLGlobal,
      enabled: true,
    };
    expect(isToggleRTLGlobalMessage(message)).toBe(true);
  });

  it("should return false if message is not ToggleRTLGlobalMessage", () => {
    const message: Message = { action: "OtherAction" as MessageActions };
    expect(isToggleRTLGlobalMessage(message)).toBe(false);
  });

  it("should return false if message is null", () => {
    expect(isToggleRTLGlobalMessage(null as unknown as Message)).toBe(false);
  });
});

describe("sendMessage", () => {
  let tabs = [] as chrome.tabs.Tab[];

  beforeEach(() => {
    tabs = [];

    const query = jest
      .fn<ReturnType<QueryCallback>, [chrome.tabs.QueryInfo, QueryCallback]>()
      .mockImplementation(
        (
          { active, currentWindow }: chrome.tabs.QueryInfo,
          queryCallback: QueryCallback,
        ) => {
          queryCallback(active === true && currentWindow === true ? tabs : []);
        },
      );

    global.chrome = {
      tabs: {
        query,
        sendMessage: jest.fn(),
      } as unknown as typeof chrome.tabs,
    } as unknown as typeof chrome;
  });

  it("should send a message to the current tab", () => {
    const tab = { id: 1 } as unknown as chrome.tabs.Tab;

    tabs = [tab];

    sendMessage({
      action: MessageActions.ToggleRTLGlobal,
      enabled: true,
    });

    expect(chrome.tabs.query).toHaveBeenCalledWith(
      { active: true, currentWindow: true },
      expect.any(Function),
    );
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(tab.id, mockMessage);
  });

  it("should not send a message if there is no current tab", () => {
    sendMessage(mockMessage);

    expect(chrome.tabs.query).toHaveBeenCalledWith(
      { active: true, currentWindow: true },
      expect.any(Function),
    );
    expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
  });
});
