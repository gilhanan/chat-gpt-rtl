import { getValue, setValue } from "./storage";

const key = "some-key";

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

describe("getValue", () => {
  it("should call chrome.storage.local.get", async () => {
    await getValue({ key });

    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      [key],
      expect.any(Function),
    );
  });

  it("should return string value", async () => {
    const value = "some-string";
    mockStorage[key] = value;

    const results = await getValue({ key });

    expect(results).toBe(value);
  });

  it("should return undefined when the value is undefined", async () => {
    const results = await getValue({ key });

    expect(results).toBe(undefined);
  });
});

describe("setValue", () => {
  it("should set a string value", async () => {
    const value = "some-string";

    await setValue({ key, value });

    expect(mockStorage[key]).toBe(value);
    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      { [key]: value },
      expect.any(Function),
    );
  });
});
