import { VisibilityProvider } from "@lib/preact-shared/providers/VisibilityProvider";
import { RouterProvider } from "@lib/preact-shared/providers/RouterProvider";

import { DisplayImage } from "./view/DisplayImage";
import { BoosterView } from "./view/BoosterView";

const MapView = {
  "display-image": <DisplayImage />,
  "booster-view": <BoosterView />,
};

export const Router = () => (
  <VisibilityProvider>
    <RouterProvider mapView={MapView} />
  </VisibilityProvider>
);
