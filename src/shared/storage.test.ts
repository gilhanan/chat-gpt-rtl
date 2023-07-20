import { getRTLEnabledValue, setRTLEnabledValue } from "./storage";

let mockStorage: Record<string, string | undefined> = {};

const get = jest.fn((keys, callback) => {
  callback(mockStorage);
});

const set = jest.fn((data, callback) => {
  Object.assign(mockStorage, data);
  callback();
});

global.chrome = {
  storage: {
    local: {
      get,
      set,
    } as unknown as chrome.storage.LocalStorageArea,
  } as unknown as chrome.storage.StorageArea,
} as unknown as typeof chrome;

beforeEach(() => {
  mockStorage = {};
});

describe("getRTLEnabledValue", () => {
  it("should call chrome.storage.local.get", async () => {
    await getRTLEnabledValue();

    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      ["chat-gpt-rtl-enabled"],
      expect.any(Function),
    );
  });

  it("should return true when the value is 'true'", async () => {
    mockStorage["chat-gpt-rtl-enabled"] = "true";

    const value = await getRTLEnabledValue();

    expect(value).toBe(true);
  });

  it("should return false when the value is 'false'", async () => {
    mockStorage["chat-gpt-rtl-enabled"] = "false";

    const value = await getRTLEnabledValue();

    expect(value).toBe(false);
  });

  it("should return true when the value is undefined", async () => {
    mockStorage["chat-gpt-rtl-enabled"] = undefined;

    const value = await getRTLEnabledValue();

    expect(value).toBe(true);
  });
});

describe("setRTLEnabledValue", () => {
  it("should set the value to 'true'", async () => {
    const enabled = true;

    await setRTLEnabledValue(enabled);

    expect(mockStorage["chat-gpt-rtl-enabled"]).toBe("true");
    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      { "chat-gpt-rtl-enabled": "true" },
      expect.any(Function),
    );
  });

  it("should set the value to 'false'", async () => {
    const enabled = false;

    await setRTLEnabledValue(enabled);

    expect(mockStorage["chat-gpt-rtl-enabled"]).toBe("false");
    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      { "chat-gpt-rtl-enabled": "false" },
      expect.any(Function),
    );
  });
});
