import { sendMessage } from "./messages";

type QueryCallback = (result: chrome.tabs.Tab[]) => void;

const message = { action: "Test" };

describe("sendMessage", () => {
  let tabs = [] as chrome.tabs.Tab[];

  beforeEach(() => {
    tabs = [];

    const query = jest
      .fn<ReturnType<QueryCallback>, [chrome.tabs.QueryInfo, QueryCallback]>()
      .mockImplementation(
        (queryInfo: chrome.tabs.QueryInfo, queryCallback: QueryCallback) => {
          queryCallback(tabs);
        },
      );

    global.chrome = {
      tabs: {
        query,
        sendMessage: jest.fn(),
      } as unknown as typeof chrome.tabs,
    } as unknown as typeof chrome;
  });

  it("should use chrome.tabs.query", async () => {
    await sendMessage(message);

    expect(chrome.tabs.query).toHaveBeenCalledWith(
      { active: true, lastFocusedWindow: true },
      expect.any(Function),
    );
  });

  it("should send a message to a tab", async () => {
    const tab = { id: 1 } as unknown as chrome.tabs.Tab;

    tabs = [tab];

    await sendMessage(message);

    expect(chrome.tabs.sendMessage).toHaveBeenCalledTimes(tabs.length);
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(tab.id, message);
  });

  it("should send a message to multiple tabs", async () => {
    const firstTab = { id: 1 } as unknown as chrome.tabs.Tab;
    const secondTab = { id: 2 } as unknown as chrome.tabs.Tab;

    tabs = [firstTab, secondTab];

    await sendMessage(message);

    expect(chrome.tabs.sendMessage).toHaveBeenCalledTimes(tabs.length);
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(firstTab.id, message);
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(secondTab.id, message);
  });

  it("should not send a message if there is no current tab", async () => {
    await sendMessage(message);

    expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
  });

  it("should not send a message if tab is undefined", async () => {
    const tab = null as unknown as chrome.tabs.Tab;

    tabs = [tab];

    await sendMessage(message);

    expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
  });

  it("should not send a message if tab's id is undefined", async () => {
    const tab = { id: undefined } as unknown as chrome.tabs.Tab;

    tabs = [tab];

    await sendMessage(message);

    expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
  });
});
