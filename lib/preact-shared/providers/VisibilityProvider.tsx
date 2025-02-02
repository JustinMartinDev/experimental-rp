import { ComponentChildren, Context, createContext } from "preact";
import { useContext, useState, useEffect } from "preact/hooks";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void;
}

type VisibilityProviderProps = {
  children: ComponentChildren;
};

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider = ({ children }: VisibilityProviderProps) => {
  const [visible, setVisible] = useState(false);

  useNuiEvent<boolean>("set-visible", setVisible);

  useEffect(() => {
    if (isEnvBrowser()) return;

    // Only attach listener when we are visible
    const resourceName = window.GetParentResourceName();

    parent.citFrames[resourceName].style.setProperty(
      "visibility",
      visible ? "visible" : "hidden",
    );
  }, [visible]);

  return (
    <VisibilityCtx.Provider
      value={{
        setVisible,
      }}
    >
      <div>{children}</div>
    </VisibilityCtx.Provider>
  );
};

export const useVisibility = () =>
  useContext<VisibilityProviderValue>(
    VisibilityCtx as Context<VisibilityProviderValue>,
  );
