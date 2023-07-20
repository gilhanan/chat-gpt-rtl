import { containsRTL } from "./utils";

describe("containsRTL", () => {
  it("should return true for Arabic text", () => {
    const text = "مرحبا بالعالم";
    expect(containsRTL(text)).toBe(true);
  });

  it("should return true for English and Arabic text", () => {
    const text = "Hello world مرحبا بالعالم";
    expect(containsRTL(text)).toBe(true);
  });

  it("should return true for Hebrew text", () => {
    const text = "שלום עולם";
    expect(containsRTL(text)).toBe(true);
  });

  it("should return true for English and Hebrew text", () => {
    const text = "Hello world שלום עולם";
    expect(containsRTL(text)).toBe(true);
  });

  it("should return false for English text", () => {
    const text = "Hello world";
    expect(containsRTL(text)).toBe(false);
  });

  it("should return false for empty string", () => {
    const text = "";
    expect(containsRTL(text)).toBe(false);
  });
});
