import { Context, createContext, useContext, useState } from "react";

if (window.mockTriggerNuiEvent) {
  window.mockTriggerNuiEvent({ action: "setVisible", data: false });
}

const RouterCtx = createContext<RouterProvider | null>(null);

type ViewId = "default"

const RouterMap: Record<ViewId, React.ReactElement> = {
  default: <div>default</div>,
};

interface RouterProvider {
  setView: (viewId: ViewId, context?: object) => void;
  context: object;
}

export const RouterProvider = () => {
  const [context, setContext] = useState<object>({});
  const [viewId, setViewId] = useState<ViewId>("default");

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
      {RouterMap[viewId]}
    </RouterCtx.Provider>
  );
};

export const useRouter = () =>
  useContext<RouterProvider>(RouterCtx as Context<RouterProvider>);
