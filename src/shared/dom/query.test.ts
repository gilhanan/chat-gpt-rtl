import { filterHTMLElements, queryHTMLElements } from "./query";

describe("filterHTMLElements", () => {
  it("should filter out non-HTMLElement nodes", () => {
    const htmlList = [
      document.createElement("div"),
      document.createElement("span"),
      document.createElement("p"),
    ];

    const additionalNodes = [
      document.createTextNode("Text Node"),
      document.createComment("Comment Node"),
    ];

    const nodeList = [...htmlList, ...additionalNodes] as unknown as NodeList;

    const result = filterHTMLElements(nodeList);

    expect(result).toStrictEqual(htmlList);
  });
});

describe("queryHTMLElements", () => {
  it("should return an array of matching HTMLElements", () => {
    const foo = "foo";
    const container = document.createElement("div");

    const divElement = document.createElement("div");
    divElement.classList.add(foo);
    container.appendChild(divElement);

    const spanElement = document.createElement("span");
    spanElement.classList.add(foo);
    container.appendChild(spanElement);

    const pElement = document.createElement("p");
    pElement.classList.add("bar");

    container.append(divElement, spanElement, pElement);

    const results = queryHTMLElements({
      element: container,
      selector: `.${foo}`,
    });

    expect(results).toStrictEqual([divElement, spanElement]);
  });

  it("should filter out non-HTMLElement nodes", () => {
    const container = document.createElement("div");

    const htmlList = [
      document.createElement("div"),
      document.createElement("span"),
      document.createElement("p"),
    ];

    const additionalNodes = [
      document.createTextNode("Text Node"),
      document.createComment("Comment Node"),
    ];

    container.append(...htmlList, ...additionalNodes);

    const results = queryHTMLElements({
      element: container,
      selector: "*",
    });

    expect(results).toStrictEqual(htmlList);
  });
});
