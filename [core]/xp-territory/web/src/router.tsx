import { RouterProvider } from "@lib/preact-shared/providers/RouterProvider";

import { HomeTerritoryMenu } from "./view/HomeTerritoryMenu";
import { VisibilityProvider } from "@lib/preact-shared/providers/VisibilityProvider";

const MapView = {
  home: <HomeTerritoryMenu />,
};

export const Router = () => (
  <VisibilityProvider>
    <div className="inventory-menu-popup">
      <RouterProvider mapView={MapView} />
    </div>
  </VisibilityProvider>
);
