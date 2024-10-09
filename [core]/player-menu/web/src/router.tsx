import { RouterProvider } from "@lib/preact-shared/providers/RouterProvider";

import { HomePlayerMenu } from "./view/HomeMenu";
import { InventoryMenu } from "./view/InventoryMenu";
import { ItemMenu } from "./view/ItemMenu";

import { Footer } from "./components/Footer";

const MapView = {
  home: <HomePlayerMenu footer={<Footer />} />,
  inventory: <InventoryMenu footer={<Footer />} />,
  item: <ItemMenu footer={<Footer />} />,
};

export const Router = () => (
  <div className="inventory-menu-popup">
    <RouterProvider mapView={MapView} />
  </div>
);
