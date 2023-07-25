const rtlRanges = [
  [0x05d0, 0x05ea], // Hebrew
  [0x0620, 0x064a], // Arabic
  [0x0710, 0x072c], // Syriac
  [0x0750, 0x077f], // Arabic Supplement
  [0x0780, 0x07b1], // Thaana
  [0x07ca, 0x07ea], // N'ko
  [0x0800, 0x0815], // Samaritan
  [0x0840, 0x085b], // Mandaic
  [0x08a0, 0x08bd], // Arabic Extended-A
];

const rtlRegex = new RegExp(
  `[${rtlRanges
    .map(
      ([rangeStart, rangeEnd]) =>
        `\\u${rangeStart.toString(16).padStart(4, "0")}-\\u${rangeEnd
          .toString(16)
          .padStart(4, "0")}`,
    )
    .join("")}]`,
);

export function containsRTL(text: string): boolean {
  return rtlRegex.test(text);
}

export function getDirection(): "rtl" | "ltr" {
  const uiLanguage = chrome.i18n.getUILanguage();

  return ["he"].includes(uiLanguage) ? "rtl" : "ltr";
}
