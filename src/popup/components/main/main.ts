import { createMain } from "../../../shared/dom";
import { createSettingsContainer } from "../settings";

interface MainLandmarkElements {
  settings: Parameters<typeof createSettingsContainer>[0];
}

export function createMainLandmark({
  settings,
}: MainLandmarkElements): HTMLElement {
  const main = createMain();

  const settingsContainer = createSettingsContainer(settings);

  main.append(settingsContainer);

  return main;
}
