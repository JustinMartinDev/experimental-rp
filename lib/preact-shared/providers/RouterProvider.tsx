import { Context, createContext, Fragment, FunctionalComponent } from "preact";

import { useContext, useState } from "preact/hooks";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { JSXInternal } from "preact/src/jsx";

type onNuiEventSetViewParams = {
  viewId: string;
  data: object;
};

type Props = {
  mapView: Record<string, JSXInternal.Element>;
};

interface RouterProvider {
  setView: (viewId: string, context?: object) => void;
  getStepContext: <T>(viewId: string) => T;
  context: object;
}

const RouterCtx = createContext<RouterProvider | null>(null);

export const RouterProvider = ({ mapView }: Props) => {
  const [context, setContext] = useState<object>({});
  const [viewId, setViewId] = useState<string>("home");

  const onNuiEventSetView = ({ viewId, data }: onNuiEventSetViewParams) => {
    setContext({ ...context, [viewId]: data });
    setViewId(viewId);
  };

  useNuiEvent<onNuiEventSetViewParams>("set-view", onNuiEventSetView);

  const setView = (viewId: string, newContext: object = {}) => {
    setContext({ ...context, [viewId]: newContext });
    setViewId(viewId);
  };

  function getStepContext<T>(viewId: string) {
    if (viewId in context) {
      return context[viewId as keyof typeof context] as T;
    }

    console.warn(`View ${viewId} not found in context`);
    return null;
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
