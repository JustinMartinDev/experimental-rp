import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { expect, it, vi } from "vitest";
import { HomePlayerMenu } from "./HomePlayerMenu";
import * as RouterProviderExports from "@lib/preact-shared/providers/RouterProvider";
import * as fetchNuiExports from "@lib/preact-shared/utils/fetchNui";
import { inventoryWithItems } from "@xp-inventory/mocks/inventoryWithItems";

it("should render the HomeMenu", () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");

  useRouterSpy.mockReturnValue({
    setView: vi.fn(),
    getStepContext: vi.fn(),
    context: {},
  });

  render(<HomePlayerMenu footer={<div>footer</div>} />);

  screen.getByText("Inventaire");
  screen.getByText("Personnel");
  screen.getByText("footer");
});

it("should call 'hide-frame' from NUI call when 'escape' pressed", async () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");
  const fetchNuiSpy = vi.spyOn(fetchNuiExports, "fetchNui");

  useRouterSpy.mockReturnValue({
    setView: vi.fn(),
    getStepContext: vi.fn(),
    context: {},
  });

  const { container } = render(<HomePlayerMenu footer={<div>footer</div>} />);

  screen.getByText("Inventaire");

  fireEvent.keyDown(container, { code: "Escape" });

  await waitFor(() => {
    expect(fetchNuiSpy).toHaveBeenNthCalledWith(1, "hide-frame");
  });
});

it("should call 'get-my-inventory' from NUI call when 'Inventaire' is selected", async () => {
  const useRouterSpy = vi.spyOn(RouterProviderExports, "useRouter");
  const fetchNuiSpy = vi.spyOn(fetchNuiExports, "fetchNui");

  const setViewMock = vi.fn();

  useRouterSpy.mockReturnValue({
    setView: setViewMock,
    getStepContext: vi.fn(),
    context: {},
  });

  const { container } = render(<HomePlayerMenu footer={<div>footer</div>} />);

  screen.getByText("Inventaire");

  fireEvent.keyDown(container, { code: "Enter" });

  await waitFor(() => {
    expect(fetchNuiSpy).toHaveBeenNthCalledWith(
      1,
      "get-my-inventory",
      "inventory"
    );
  });

  await waitFor(() => {
    expect(setViewMock).toHaveBeenNthCalledWith(1, "inventory", {
      inventory: inventoryWithItems,
    });
  });
});
