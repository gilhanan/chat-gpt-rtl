import "./popup.scss";
import { createHeader, createSettingsContainer } from "./components";
import { getRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { sendToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";

async function render(): Promise<void> {
  const titleContainer = createHeader();

  const enabled = await getRTLEnabledValue();

  const settingsContainer = await createSettingsContainer({
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
