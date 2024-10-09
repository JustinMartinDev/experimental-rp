import { Context, createContext, Fragment, FunctionalComponent } from "preact";

import { useContext, useState } from "preact/hooks";
import { useNuiEvent } from "../hooks/useNuiEvent";

type onNuiEventSetViewParams = {
  viewId: string;
  data: object;
};

type Props = {
  mapView: Record<string, FunctionalComponent>;
};

interface RouterProvider {
  setView: (viewId: string, context?: object) => void; 
  getStepContext: <T>(viewId: string) => T;
  context: object;
}

const RouterCtx = createContext<RouterProvider | null>(null);

export const RouterProvider = ({ mapView }: Props) => {
  const [context, setContext] = useState<object>({});
  const [viewId, setViewId] = useState<string>();

  const onNuiEventSetView = ({ viewId, data }: onNuiEventSetViewParams) => {
    setContext({ ...context, [viewId]: data });
    setViewId(viewId);
  };

  useNuiEvent<onNuiEventSetViewParams>("setView", onNuiEventSetView);

  const setView = (viewId: string, newContext: object = {}) => {
    setContext({ ...context, [viewId]: newContext });
    setViewId(viewId);
  };

  function getStepContext<T>(viewId: string) {
    if (viewId in context) {
      return context[viewId as keyof typeof context] as T;
    }

    throw new Error(`View ${viewId} not found in context`);
  }

  return (
    <RouterCtx.Provider
      value={{
        setView: setView,
        getStepContext,
        context,
      }}
    >
      {!viewId && <Fragment>Not defined</Fragment>}
      {viewId && viewId in mapView && mapView[viewId]}
    </RouterCtx.Provider>
  );
};

export const useRouter = () =>
  useContext<RouterProvider>(RouterCtx as Context<RouterProvider>);
