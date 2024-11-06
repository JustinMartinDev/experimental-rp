import { RouterProvider } from "@lib/preact-shared/providers/RouterProvider";

import { HomePlayerMenu } from "./view/HomePlayerMenu";
import { InventoryMenu } from "./view/InventoryMenu";
import { ItemMenu } from "./view/ItemMenu";
import { SelectCharacterMenu } from "./view/SelectCharacterMenu";

import { Footer } from "./components/Footer";
import { VisibilityProvider } from "@lib/preact-shared/providers/VisibilityProvider";

const MapView = {
  home: <HomePlayerMenu footer={<Footer />} />,
  inventory: <InventoryMenu footer={<Footer />} />,
  item: <ItemMenu footer={<Footer />} />,
  "character-menu": <SelectCharacterMenu />,
};

export const Router = () => (
  <VisibilityProvider>
    <div className="inventory-menu-popup">
      <RouterProvider mapView={MapView} />
    </div>
  </VisibilityProvider>
);
