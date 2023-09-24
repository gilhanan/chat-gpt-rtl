import "./popup.scss";
import { createHeaderLandmark, createMainLandmark } from "./components";
import { getRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { sendToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";
import { getDirection } from "../shared/utils";

function setHTMLLanguage(): void {
  const lang = chrome.i18n.getUILanguage();
  document.documentElement.setAttribute("lang", lang);
}

function setDocumentDirection(): void {
  document.dir = getDirection();
}

async function render(): Promise<void> {
  setHTMLLanguage();
  setDocumentDirection();

  const header = createHeaderLandmark();

  const enabled = await getRTLEnabledValue();

  const main = createMainLandmark({
    settings: {
      enabled,
      onChanged: ({ checked }) => {
        void sendToggleRTLGlobalMessage({
          enabled: checked,
        });
      },
    },
  });

  document.body.append(header, main);
}

document.addEventListener("DOMContentLoaded", () => {
  void render();
});
