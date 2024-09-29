import { Context, createContext, useContext, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { DisplayImage } from "../view/DisplayImage";


if (window.mockTriggerNuiEvent) {
  window.mockTriggerNuiEvent({ action: "setVisible", data: false });
}

const RouterCtx = createContext<RouterProvider | null>(null);

type ViewId = "default" | "disply-image";

const RouterMap: Record<ViewId, React.ReactElement> = {
  default: <div>default</div>,
  "display-image": <DisplayImage/>,
};

interface RouterProvider {
  setView: (viewId: ViewId, context?: object) => void;
  context: object;
}

type onNuiEventSetViewParams = {
  viewId: ViewId;
  data: object;
};

export const RouterProvider = () => {
  const [context, setContext] = useState<object>({});
  const [viewId, setViewId] = useState<ViewId>("default");

  const onNuiEventSetView = ({ viewId, data }: onNuiEventSetViewParams) => {
    console.log("setView", viewId, data);
    setContext({ ...context, [viewId]: data });
    setViewId(viewId);
  };

  useNuiEvent<onNuiEventSetViewParams>("setView", onNuiEventSetView);

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
