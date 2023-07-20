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

  it("should send a message to the current tab", async () => {
    const tab = { id: 1 } as unknown as chrome.tabs.Tab;

    tabs = [tab];

    await sendMessage(message);

    expect(chrome.tabs.query).toHaveBeenCalledWith(
      { active: true, currentWindow: true },
      expect.any(Function),
    );
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(tab.id, message);
  });

  it("should not send a message if there is no current tab", () => {
    void sendMessage(message);

    expect(chrome.tabs.query).toHaveBeenCalledWith(
      { active: true, currentWindow: true },
      expect.any(Function),
    );
    expect(chrome.tabs.sendMessage).not.toHaveBeenCalled();
  });
});
