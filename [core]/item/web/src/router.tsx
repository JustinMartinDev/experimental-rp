import { Context, createContext, useContext, useState } from "react";
import { HomePlayerMenu } from "./view/HomeMenu";
import { Footer } from "./components/Footer";
import { InventoryMenu } from "./view/InventoryMenu";
import { ItemMenu } from "./view/ItemMenu";

if (window.mockTriggerNuiEvent) {
  window.mockTriggerNuiEvent({ action: "setVisible", data: false });
}

const RouterCtx = createContext<RouterProvider | null>(null);

type ViewId = "home" | "inventory" | "item";

const RouterMap: Record<ViewId, React.ReactElement> = {
  home: <HomePlayerMenu footer={<Footer />} />,
  inventory: <InventoryMenu footer={<Footer />} />,
  item: <ItemMenu footer={<Footer />} />,
};

interface RouterProvider {
  setView: (viewId: ViewId, context?: object) => void;
  context: object;
}

export const RouterProvider = () => {
  const [context, setContext] = useState<object>({});
  const [viewId, setViewId] = useState<ViewId>("home");

  return (
    <RouterCtx.Provider
      value={{
        setView: (viewId: ViewId, newContext: object = {}) => {
          setContext({ ...context, [viewId]: newContext });
          setViewId(viewId);
        },
        context,
      }}
    >
      <div className="inventory-menu-popup">{RouterMap[viewId]}</div>
    </RouterCtx.Provider>
  );
};

export const useRouter = () =>
  useContext<RouterProvider>(RouterCtx as Context<RouterProvider>);
