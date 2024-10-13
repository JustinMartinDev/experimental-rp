import { isEnvBrowser } from "./utils/misc";
import {
  mockTriggerNuiEvent,
  mockTriggerNuiEvents,
} from "./utils/mockTriggerNuiEvent";

declare global {
  interface Window {
    invokeNative?: unknown;
    GetParentResourceName: () => string;
    citFrames: Record<string, HTMLIFrameElement>;
    mockTriggerNuiEvents: typeof mockTriggerNuiEvents;
    mockTriggerNuiEvent: typeof mockTriggerNuiEvent;
  }
}

export const initNuiFrame = (frameId: string) => {
  if (import.meta.env.MODE === "development" && isEnvBrowser()) {
    window.mockTriggerNuiEvent = mockTriggerNuiEvent;
    window.mockTriggerNuiEvents = mockTriggerNuiEvents;
  }

  window.GetParentResourceName = () => {
    return frameId;
  };
};
