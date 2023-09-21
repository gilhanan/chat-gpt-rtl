import { sendMessage } from "./chrome";

const action = "ToggleRTLGlobal";

export interface ToggleRTLGlobalMessage {
  action: typeof action;
  enabled: boolean;
}

export function isToggleRTLGlobalMessage(
  message: any,
): message is ToggleRTLGlobalMessage {
  return message?.action === action;
}

export async function sendToggleRTLGlobalMessage({
  enabled,
}: {
  enabled: ToggleRTLGlobalMessage["enabled"];
}): Promise<void> {
  await sendMessage<ToggleRTLGlobalMessage>({
    action,
    enabled,
  });
}
