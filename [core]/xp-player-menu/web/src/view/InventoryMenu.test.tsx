import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { beforeEach, expect, it, vi } from "vitest";
import * as RouterProviderExports from "@lib/preact-shared/providers/RouterProvider";
import { inventoryWithItems } from "@xp-inventory/mocks/inventoryWithItems";
import { InventoryMenu } from "./InventoryMenu";

let getStepContextMock = vi.fn();

beforeEach(() => {
  getStepContextMock = vi
    .fn()
    .mockReturnValue({ inventory: inventoryWithItems });
});

it("should render the InventoryMenu", () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");

  useRouterSpy.mockReturnValue({
    setView: vi.fn(),
    getStepContext: getStepContextMock,
    context: {},
  });

  render(<InventoryMenu footer={<div>footer</div>} />);

  screen.getByText("Pizza");
  screen.getByText("Water bottle");
});

it("should call setView hook with 'home' param when 'escape' pressed", async () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");

  const setViewMock = vi.fn();

  useRouterSpy.mockReturnValue({
    setView: setViewMock,
    getStepContext: getStepContextMock,
    context: {},
  });

  const { container } = render(<InventoryMenu footer={<div>footer</div>} />);

  fireEvent.keyDown(container, { code: "Escape" });

  await waitFor(() => {
    expect(setViewMock).toHaveBeenNthCalledWith(1, "home");
  });
});

it("shoul call setView with 'item' and item in context", async () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");

  const setViewMock = vi.fn();

  useRouterSpy.mockReturnValue({
    setView: setViewMock,
    getStepContext: getStepContextMock,
    context: {},
  });

  const { container } = render(<InventoryMenu footer={<div>footer</div>} />);

  fireEvent.keyDown(container, { code: "ArrowDown" });
  fireEvent.keyDown(container, { code: "Enter" });

  await waitFor(() => {
    expect(setViewMock).toHaveBeenNthCalledWith(1, "item", {
      itemId: "water",
      inventoryId: 1,
    });
  });
});
