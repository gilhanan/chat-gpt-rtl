import { createHeaderLandmark } from "./";

describe("createHeader", () => {
  describe("rendering", () => {
    let header: HTMLElement;

    beforeEach(() => {
      header = createHeaderLandmark();
    });

    it("should render header", () => {
      expect(header).toBeDefined();
      expect(header.tagName).toBe("HEADER");
    });

    it("should render title", () => {
      const title = header.getElementsByClassName("text-xl")[0];
      expect(title.textContent).toBe("headerTitle");
    });

    it("should render description", () => {
      const description = header.getElementsByClassName("text-sm")[0];
      expect(description.textContent).toBe("headerDescriptionChatGPT.");
    });

    it("should render link", () => {
      const link = header.querySelector("a");
      expect(link?.textContent).toBe("ChatGPT");
    });
  });
});
