import { isHTMLElement } from "./utils";

export function filterHTMLElements(nodeList: NodeList): HTMLElement[] {
  return Array.from(nodeList).filter(isHTMLElement);
}

export function queryHTMLElements({
  element,
  selector,
}: {
  element: HTMLElement;
  selector: string;
}): HTMLElement[] {
  return filterHTMLElements(element.querySelectorAll(selector));
}
