import { render, screen } from "@testing-library/preact";
import { it, vi } from "vitest";
import { HomePlayerMenu } from "./HomePlayerMenu";
import * as RouterProviderExports from "@lib/preact-shared/providers/RouterProvider";

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
