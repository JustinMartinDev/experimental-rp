import { fireEvent, render, screen } from "@testing-library/preact";
import { expect, it, vi } from "vitest";
import { VisibilityProvider } from "./VisibilityProvider";

it("should setProperty 'visibility' to 'hidden' by default", () => {
  const setProperty = vi.fn();
  window.invokeNative = "value";
  window.GetParentResourceName = () => "my-resource";

  parent.citFrames = {
    "my-resource": {
      // @ts-ignore
      style: { setProperty },
    },
  };

  render(
    <VisibilityProvider>
      <div>Test</div>
    </VisibilityProvider>
  );

  screen.getByText("Test");
  expect(setProperty).toHaveBeenNthCalledWith(1, "visibility", "hidden");
});

it("should setProperty 'visibility' to 'visible' after nui event sent", () => {
  const setProperty = vi.fn();
  window.invokeNative = "value";
  window.GetParentResourceName = () => "my-resource";

  parent.citFrames = {
    "my-resource": {
      // @ts-ignore
      style: { setProperty },
    },
  };

  render(
    <VisibilityProvider>
      <div>Test</div>
    </VisibilityProvider>
  );

  screen.getByText("Test");

  fireEvent(
    window,
    new MessageEvent("message", {
      data: { action: "my-resource:set-visible", data: true },
    })
  );

  expect(setProperty).toHaveBeenNthCalledWith(2, "visibility", "visible");
});

it("should not call setProperty if invokeNavite not defined", () => {
  const setProperty = vi.fn();
  window.invokeNative = undefined;

  parent.citFrames = {
    "my-resource": {
      // @ts-ignore
      style: { setProperty },
    },
  };

  render(
    <VisibilityProvider>
      <div>Test</div>
    </VisibilityProvider>
  );

  screen.getByText("Test");
  expect(setProperty).not.toHaveBeenCalled();
});
