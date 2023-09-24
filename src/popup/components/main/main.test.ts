import { createMainLandmark } from "./main";
import { createSettingsContainer } from "../settings";

jest.mock("../settings");

describe("createMainLandmark", () => {
  it("should create a main landmark element with settings parameters", () => {
    const settings = {
      enabled: true,
      onChanged: jest.fn(),
    };

    const settingsContainer = document.createElement("div");
    jest.mocked(createSettingsContainer).mockReturnValue(settingsContainer);

    const main = createMainLandmark({
      settings,
    });

    expect(createSettingsContainer).toHaveBeenCalledWith(settings);
    expect(main.tagName).toBe("MAIN");
    expect(Array.from(main.children)).toStrictEqual([settingsContainer]);
  });
});
