import { RouterProvider } from "@lib/react-shared/providers/RouterProvider";
import { DisplayImage } from "./view/DisplayImage";

const MapView = {
  "display-image": <DisplayImage />,
};

export const Router = () => <RouterProvider mapView={MapView} />;
