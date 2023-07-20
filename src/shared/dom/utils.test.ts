import {
  isHTMLElement,
  isHTMLInputElement,
  isHTMLTextAreaElement,
  toggleClass,
} from "./utils";

describe("isHTMLElement", () => {
  it("should return true for an HTMLElement", () => {
    const element = document.createElement("div");
    expect(isHTMLElement(element)).toBe(true);
  });

  it("should return false for a non-HTMLElement", () => {
    const node = document.createTextNode("text");
    expect(isHTMLElement(node)).toBe(false);
  });
});

describe("isHTMLInputElement", () => {
  it("should return true for an HTMLInputElement", () => {
    const element = document.createElement("input");
    expect(isHTMLInputElement(element)).toBe(true);
  });

  it("should return false for a non-HTMLInputElement", () => {
    const element = document.createElement("div");
    expect(isHTMLInputElement(element)).toBe(false);
  });
});

describe("isHTMLTextAreaElement", () => {
  it("should return true for an HTMLTextAreaElement", () => {
    const element = document.createElement("textarea");
    expect(isHTMLTextAreaElement(element)).toBe(true);
  });

  it("should return false for a non-HTMLTextAreaElement", () => {
    const element = document.createElement("div");
    expect(isHTMLTextAreaElement(element)).toBe(false);
  });
});

describe("toggleClass", () => {
  it("should add the class when enabled is true", () => {
    const element = document.createElement("div");
    toggleClass({ element, className: "test", enabled: true });
    expect(element.classList.contains("test")).toBe(true);
  });

  it("should remove the class when enabled is false", () => {
    const element = document.createElement("div");
    element.classList.add("test");
    toggleClass({ element, className: "test", enabled: false });
    expect(element.classList.contains("test")).toBe(false);
  });
});
