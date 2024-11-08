import { fireEvent, render, screen } from "@testing-library/preact";
import { it } from "vitest";
import { RouterProvider } from "./RouterProvider";

it("should render the home view by default", () => {
  render(<RouterProvider mapView={{ home: <div>Home</div> }} />);

  screen.getByText("Home");
});

it("should render the inventory view after setContext called", () => {
  render(
    <RouterProvider
      mapView={{ home: <div>Home</div>, inventory: <div>Inventory</div> }}
    />,
  );

  screen.getByText("Home");

  window.GetParentResourceName = () => "my-resource";

  fireEvent(
    window,
    new MessageEvent("message", {
      data: { action: "my-resource:set-view", data: { viewId: "inventory" } },
    }),
  );

  screen.getByText("Inventory");
});

it("should render 'Not defined' if viewId not exist", () => {
  render(
    <RouterProvider
      mapView={{ home: <div>Home</div>, inventory: <div>Inventory</div> }}
    />,
  );

  screen.getByText("Home");

  window.GetParentResourceName = () => "my-resource";

  fireEvent(
    window,
    new MessageEvent("message", {
      data: { action: "my-resource:set-view", data: { viewId: null } },
    }),
  );

  screen.getByText("Not defined");
});
