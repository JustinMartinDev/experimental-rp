import { expect, it, vi } from "vitest";
import { fireEvent, renderHook } from "@testing-library/preact";
import { useNuiEvent } from "./useNuiEvent";

it("should trigger the callback when the event is fired", () => {
  const handlerMock = vi.fn();

  const { result } = renderHook(() => useNuiEvent("hide-frame", handlerMock));

  window.GetParentResourceName = () => "my-resource";

  fireEvent(
    window,
    new MessageEvent("message", {
      data: { action: "my-resource:hide-frame", data: { visibility: false } },
    }),
  );

  expect(handlerMock).toHaveBeenNthCalledWith(1, { visibility: false });
});

it("should not trigger the callback when the wrong event is fired", () => {
  const handlerMock = vi.fn();

  const { result } = renderHook(() =>
    useNuiEvent("get-my-inventory", handlerMock),
  );

  window.GetParentResourceName = () => "my-resource";

  fireEvent(
    window,
    new MessageEvent("message", {
      data: { action: "my-resource:hide-frame", data: { visibility: false } },
    }),
  );

  expect(handlerMock).not.toHaveBeenNthCalledWith(1, { visibility: false });
});

it("should not trigger the callback when hook is unmounted", () => {
  const handlerMock = vi.fn();

  const { unmount } = renderHook(() => useNuiEvent("hide-frame", handlerMock));

  unmount();

  window.GetParentResourceName = () => "my-resource";

  fireEvent(
    window,
    new MessageEvent("message", {
      data: {
        action: "my-resource:hide-frame",
        data: { visibility: false },
      },
    }),
  );

  expect(handlerMock).not.toHaveBeenNthCalledWith(1, { visibility: false });
});
