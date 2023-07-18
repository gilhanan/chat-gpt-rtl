import { containsRTL, queryHTMLElements, toggleClass } from "./utils";

export function toggleRTLEnabled({ enabled }: { enabled: boolean }): void {
  toggleClass({
    element: document.body,
    className: "chat-gpt-rtl-enabled",
    enabled,
  });
}

function getRTLElements(element: HTMLElement): HTMLElement[] {
  return queryHTMLElements({
    element,
    selector: "p, ol, ul, div:not(:has(*))",
  }).filter(({ innerText }) => Boolean(innerText) && containsRTL(innerText));
}

export function applyRTLToElements(element: HTMLElement): void {
  getRTLElements(element).forEach((element) => {
    element.classList.add("chat-gpt-rtl");
  });
}
