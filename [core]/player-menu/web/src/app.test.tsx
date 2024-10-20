import { expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/preact";
import * as fetchNuiExports from "@lib/preact-shared/utils/fetchNui";

import { App } from "./app";

it("should set GetParentResourceName when render", () => {
  render(<App />);

  expect(window.GetParentResourceName()).toBe("player-menu");
});

it("should set call player-menu:hide-frame when 'i' key pressed", () => {
  const fetchNuiSpy = vi.spyOn(fetchNuiExports, "fetchNui");

  const { container } = render(<App />);

  expect(window.GetParentResourceName()).toBe("player-menu");

  fireEvent.keyDown(container, new KeyboardEvent("keydown", { key: "i" }));

  expect(fetchNuiSpy).toHaveBeenNthCalledWith(1, "hide-frame");
});
