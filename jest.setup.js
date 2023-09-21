global.chrome = {
  i18n: {
    getUILanguage: jest.fn(),
    getMessage: jest.fn((messageName) => messageName),
  },
};
