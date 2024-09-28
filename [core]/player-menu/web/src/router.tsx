import { Context, createContext, useContext, useState } from "react";
import { HomePlayerMenu } from "./view/HomeMenu";
import { Footer } from "./components/Footer";

if (window.mockTriggerNuiEvent) {
  window.mockTriggerNuiEvent({ action: "setVisible", data: false });
}

const RouterCtx = createContext<RouterProvider | null>(null);

type ViewId = "home";

const RouterMap: Record<ViewId, React.ReactElement> = {
  home: <HomePlayerMenu footer={<Footer />} />,
};

interface RouterProvider {
  setView: (viewId: ViewId) => void;
}

export const RouterProvider = () => {
  const [viewId, setViewId] = useState<ViewId>("home");

  return (
    <RouterCtx.Provider
      value={{
        setView: (viewId: ViewId) => setViewId(viewId),
      }}
    >
      <div className="">{RouterMap[viewId]}</div>
    </RouterCtx.Provider>
  );
};

export const useRouter = () =>
  useContext<RouterProvider>(RouterCtx as Context<RouterProvider>);
