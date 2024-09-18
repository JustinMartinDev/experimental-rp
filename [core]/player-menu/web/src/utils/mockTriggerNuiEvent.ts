interface DebugEvent<T = unknown> {
  action: string;
  data: T;
}

/**
 * Emulates dispatching an event using SendNuiMessage in the lua scripts.
 * This is used when developing in browser
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 */
export const mockTriggerNuiEvents = <T>(
  events: DebugEvent<T>[],
  timer = 1000
): void => {
  for (const event of events) {
    setTimeout(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            action: event.action,
            data: event.data,
          },
        })
      );
    }, timer);
  }
};

export const mockTriggerNuiEvent = <T>(
  event: DebugEvent<T>,
  timer = 1000
): void => mockTriggerNuiEvents([event], timer);
