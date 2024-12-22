import { RouterProvider } from "@lib/preact-shared/providers/RouterProvider";

import { HomePlayerMenu } from "./view/HomeTerritoryMenu";
import { VisibilityProvider } from "@lib/preact-shared/providers/VisibilityProvider";

const MapView = {
  home: <HomePlayerMenu />,
};

export const Router = () => (
  <VisibilityProvider>
    <div className="inventory-menu-popup">
      <RouterProvider mapView={MapView} />
    </div>
  </VisibilityProvider>
);
