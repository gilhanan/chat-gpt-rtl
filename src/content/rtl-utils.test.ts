import { applyRTLToMutations, toggleRTLGlobal } from "./rtl-utils";
import * as rtlEnabledStorage from "../shared/rtl-enabled-storage";

const RTL_CLASS = "chat-gpt-rtl";
const RTL_ENABLED_CLASS = "chat-gpt-rtl-enabled";
const RTL_CONTENT = "مرحبا بك في";
const LTR_CONTENT = "Hello, World";

describe("applyRTLToMutations", () => {
  it(`should apply the RTL class to elements that have their textContent changed to RTL content`, () => {
    const textNode = document.createTextNode(RTL_CONTENT);
    const div = document.createElement("div");
    div.append(textNode);

    const mutation = {
      type: "characterData",
      target: textNode,
    } as unknown as MutationRecord;

    applyRTLToMutations([mutation]);

    expect(div.classList.contains(RTL_CLASS)).toBe(true);
  });

  it.each([
    { value: LTR_CONTENT, expected: false },
    { value: RTL_CONTENT, expected: true },
  ])(
    "should handle textarea elements based on RTL content correctly",
    ({ value, expected }) => {
      const textarea = document.createElement("textarea");
      textarea.value = value;

      const mutation = {
        type: "childList",
        target: textarea,
      } as unknown as MutationRecord;

      applyRTLToMutations([mutation]);

      expect(textarea.classList.contains(RTL_CLASS)).toBe(expected);
    },
  );

  it.each([
    { value: LTR_CONTENT, expected: false },
    { value: RTL_CONTENT, expected: true },
  ])(
    "should handle textarea elements based on RTL content correctly",
    ({ value, expected }) => {
      const div = document.createElement("div");
      const p = document.createElement("p");
      p.textContent = value;
      div.append(p);

      const mutation = {
        type: "childList",
        target: div,
      } as unknown as MutationRecord;

      applyRTLToMutations([mutation]);

      expect(p.classList.contains(RTL_CLASS)).toBe(expected);
    },
  );

  it.each(["p", "ol", "ul", "div"])(
    "should apply the RTL class to child elements of type '%s' with RTL content",
    (tagName) => {
      const div = document.createElement("div");
      const childElement = document.createElement(tagName);
      childElement.textContent = RTL_CONTENT;
      div.append(childElement);

      const mutation = {
        type: "childList",
        target: div,
      } as unknown as MutationRecord;

      applyRTLToMutations([mutation]);

      expect(childElement.classList.contains(RTL_CLASS)).toBe(true);
    },
  );

  it(`should not apply the RTL class to div with RTL content and children elements`, () => {
    const parent = document.createElement("div");
    const rtlTextNode = document.createTextNode(RTL_CONTENT);
    const childElement = document.createElement("div");
    parent.append(rtlTextNode, childElement);

    const mutation = {
      type: "childList",
      target: parent,
    } as unknown as MutationRecord;

    applyRTLToMutations([mutation]);

    expect(childElement.classList.contains(RTL_CLASS)).toBe(false);
  });
});

describe("toggleRTLGlobal", () => {
  let setRTLEnabledValueMock: jest.SpyInstance;

  beforeEach(() => {
    document.body.className = "";
    setRTLEnabledValueMock = jest
      .spyOn(rtlEnabledStorage, "setRTLEnabledValue")
      .mockImplementation(jest.fn());
  });

  it.each([
    { enabled: true, expected: true },
    { enabled: false, expected: false },
  ])(
    `should correctly manage the class '${RTL_ENABLED_CLASS}' on the body element depending on the enabled state`,
    ({ enabled, expected }) => {
      toggleRTLGlobal({ enabled });
      expect(document.body.classList.contains(RTL_ENABLED_CLASS)).toBe(
        expected,
      );
      expect(setRTLEnabledValueMock).toHaveBeenCalledWith(enabled);
    },
  );

  it.each([
    { enabled: true, expected: true },
    { enabled: false, expected: false },
  ])(
    `should correctly manage the class '${RTL_ENABLED_CLASS}' on the body element depending on the enabled state, even if there are other classes`,
    ({ enabled, expected }) => {
      document.body.classList.add("other-class");

      toggleRTLGlobal({ enabled });
      expect(document.body.classList.contains(RTL_ENABLED_CLASS)).toBe(
        expected,
      );
      expect(setRTLEnabledValueMock).toHaveBeenCalledWith(enabled);
    },
  );
});
