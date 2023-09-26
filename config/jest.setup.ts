const chromeI18nMock: typeof chrome.i18n = {
  getUILanguage: jest.fn(),
  getMessage: jest.fn((messageName) => messageName),
} satisfies Partial<typeof chrome.i18n> as unknown as typeof chrome.i18n;

const chromeRuntimeMock: typeof chrome.runtime = {
  onMessage: {
    addListener: jest.fn(),
  } satisfies Partial<chrome.runtime.ExtensionMessageEvent> as unknown as chrome.runtime.ExtensionMessageEvent,
} satisfies Partial<typeof chrome.runtime> as unknown as typeof chrome.runtime;

const chromeStorageMock: typeof chrome.storage = {
  local: {
    get: jest.fn(),
    set: jest.fn(),
  } satisfies Partial<chrome.storage.LocalStorageArea> as unknown as chrome.storage.LocalStorageArea,
} satisfies Partial<typeof chrome.storage> as unknown as typeof chrome.storage;

global.chrome = {
  i18n: chromeI18nMock,
  runtime: chromeRuntimeMock,
  storage: chromeStorageMock,
} satisfies Partial<typeof chrome> as unknown as typeof chrome;
