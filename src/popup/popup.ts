import "./popup.scss";
import { createHeader, createSettingsContainer } from "./components";
import { getRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { sendToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";
import { getDirection } from "../shared/utils";

function setDocumentDirection(): void {
  document.dir = getDirection();
}

async function render(): Promise<void> {
  setDocumentDirection();

  const titleContainer = createHeader();

  const enabled = await getRTLEnabledValue();

  const settingsContainer = createSettingsContainer({
    enabled,
    onChanged: ({ checked }) => {
      void sendToggleRTLGlobalMessage({
        enabled: checked,
      });
    },
  });

  document.body.append(titleContainer, settingsContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  void render();
});
