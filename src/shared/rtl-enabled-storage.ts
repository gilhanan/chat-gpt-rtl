import { getValue, setValue } from "./chrome";

const key = "chat-gpt-rtl-enabled";

export async function getRTLEnabledValue(): Promise<boolean> {
  const value = await getValue<string>({ key });
  return !(value === "false");
}

export async function setRTLEnabledValue(enabled: boolean): Promise<void> {
  await setValue({ key, value: enabled.toString() });
}
