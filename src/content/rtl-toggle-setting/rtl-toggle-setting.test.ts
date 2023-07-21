import { getRTLEnabledValue } from "../../shared/rtl-enabled-storage";
import { isHTMLElement } from "../../shared/dom";
import { toggleRTLGlobal } from "../rtl-utils";
import { createRTLToggleSetting } from "../rtl-toggle-setting-checkbox";
import { initRTLEnabledCheckbox } from "./rtl-toggle-setting";

jest.mock("../../shared/rtl-enabled-storage");
jest.mock("../../shared/dom");
jest.mock("../rtl-utils");
jest.mock("../rtl-toggle-setting-checkbox");

let mockedGetRTLEnabledValue: jest.MockedFunction<typeof getRTLEnabledValue>;
let mockedIsHTMLElement: jest.MockedFunction<typeof isHTMLElement>;
let mockedToggleRTLGlobal: jest.MockedFunction<typeof toggleRTLGlobal>;
let mockedCreateRTLToggleSetting: jest.MockedFunction<
  typeof createRTLToggleSetting
>;

beforeEach(() => {
  mockedGetRTLEnabledValue = getRTLEnabledValue as jest.MockedFunction<
    typeof getRTLEnabledValue
  >;
  mockedIsHTMLElement = isHTMLElement as jest.MockedFunction<
    typeof isHTMLElement
  >;
  mockedToggleRTLGlobal = toggleRTLGlobal as jest.MockedFunction<
    typeof toggleRTLGlobal
  >;
  mockedCreateRTLToggleSetting = createRTLToggleSetting as jest.MockedFunction<
    typeof createRTLToggleSetting
  >;
});

describe("initRTLEnabledCheckbox", () => {
  const mockMutations: MutationRecord[] = [];

  it("should return early when generalSettingsPanel is null", async () => {
    mockedIsHTMLElement.mockReturnValue(false);

    await initRTLEnabledCheckbox(mockMutations);

    expect(mockedGetRTLEnabledValue).not.toBeCalled();
    expect(mockedCreateRTLToggleSetting).not.toBeCalled();
    expect(mockedToggleRTLGlobal).not.toBeCalled();
  });

  it("should proceed when generalSettingsPanel is not null", async () => {
    const generalSettingsPanel = document.createElement("div");
    generalSettingsPanel.append = jest.fn();

    const generalSettingsPanelContainer = document.createElement("div");
    generalSettingsPanelContainer.id = "test-content-General";
    generalSettingsPanelContainer.append(generalSettingsPanel);

    const root = document.createElement("div");
    root.append(generalSettingsPanelContainer);

    const rtlToggleSetting = document.createElement("input");

    const mockMutations: MutationRecord[] = [
      {
        addedNodes: [generalSettingsPanelContainer],
      } as unknown as MutationRecord,
    ];

    mockedIsHTMLElement.mockReturnValue(true);
    mockedGetRTLEnabledValue.mockResolvedValue(true);
    mockedCreateRTLToggleSetting.mockReturnValue(rtlToggleSetting);

    await initRTLEnabledCheckbox(mockMutations);

    expect(mockedGetRTLEnabledValue).toBeCalled();
    expect(mockedCreateRTLToggleSetting).toBeCalledWith({
      enabled: true,
      onChange: expect.any(Function),
    });
    expect(generalSettingsPanel.append).toBeCalledWith(rtlToggleSetting);
  });
});
