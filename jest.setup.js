global.chrome = {
  i18n: {
    getUILanguage: jest.fn(),
    getMessage: jest.fn((messageName) => messageName),
  },
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
};
