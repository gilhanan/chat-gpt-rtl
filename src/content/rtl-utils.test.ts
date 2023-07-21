import { toggleRTLGlobal } from "./rtl-utils";

jest.mock("../shared/rtl-enabled-storage");

describe("toggleRTLGlobal", () => {
  beforeEach(() => {
    document.body.className = "";
  });

  it.each([
    { enabled: true, expected: true },
    { enabled: false, expected: false },
  ])(
    "should correctly manage the class 'chat-gpt-rtl-enabled' on the body element depending on the enabled state",
    ({ enabled, expected }) => {
      toggleRTLGlobal({ enabled });
      expect(document.body.classList.contains("chat-gpt-rtl-enabled")).toBe(
        expected,
      );
    },
  );

  it.each([
    { enabled: true, expected: true },
    { enabled: false, expected: false },
  ])(
    "should correctly manage the class 'chat-gpt-rtl-enabled' on the body element depending on the enabled state, even if there are other classes",
    ({ enabled, expected }) => {
      document.body.classList.add("other-class");

      toggleRTLGlobal({ enabled });
      expect(document.body.classList.contains("chat-gpt-rtl-enabled")).toBe(
        expected,
      );
    },
  );
});
