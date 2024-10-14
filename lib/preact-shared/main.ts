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

export const initNuiFrame = (frameWindow: Window, frameId: string) => {
  if (import.meta.env.MODE === "development" && isEnvBrowser()) {
    frameWindow.mockTriggerNuiEvent = mockTriggerNuiEvent;
    frameWindow.mockTriggerNuiEvents = mockTriggerNuiEvents;
  }

  frameWindow.GetParentResourceName = () => {
    return frameId;
  };
};
