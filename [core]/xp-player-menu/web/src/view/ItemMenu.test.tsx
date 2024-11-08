import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { beforeEach, expect, it, vi } from "vitest";
import * as FetchNuiExports from "@lib/preact-shared/utils/fetchNui";
import * as RouterProviderExports from "@lib/preact-shared/providers/RouterProvider";
import { inventoryWithItems } from "@xp-inventory/mocks/inventoryWithItems";
import { ItemMenu } from "./ItemMenu";

let getStepContextMock = vi.fn();

beforeEach(() => {
  getStepContextMock = vi.fn().mockReturnValue({
    inventoryId: inventoryWithItems.id,
    itemId: inventoryWithItems.items[1].item.id,
  });
});

it("should render the ItemMenu", () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");

  useRouterSpy.mockReturnValue({
    setView: vi.fn(),
    getStepContext: getStepContextMock,
    context: {},
  });

  render(<ItemMenu footer={<div>footer</div>} />);

  screen.getByText("QUE FAIRE ?");
});

it("should call setView hook with 'inventory' param when 'escape' pressed", async () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");

  const setViewMock = vi.fn();

  useRouterSpy.mockReturnValue({
    setView: setViewMock,
    getStepContext: getStepContextMock,
    context: {},
  });

  const { container } = render(<ItemMenu footer={<div>footer</div>} />);

  fireEvent.keyDown(container, { code: "Escape" });

  await waitFor(() => {
    expect(setViewMock).toHaveBeenNthCalledWith(1, "inventory");
  });
});

it("shoul call fetchNui with 'use-item' and item in context", async () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");
  const fetchNuiSpy = vi.spyOn(FetchNuiExports, "fetchNui");

  useRouterSpy.mockReturnValue({
    setView: vi.fn(),
    getStepContext: getStepContextMock,
    context: {},
  });

  const { container } = render(<ItemMenu footer={<div>footer</div>} />);

  fireEvent.keyDown(container, { code: "Enter" });

  await waitFor(() => {
    expect(fetchNuiSpy).toHaveBeenNthCalledWith(1, "use-item", "inventory", {
      itemId: "water",
      inventoryId: 1,
    });
  });
});
