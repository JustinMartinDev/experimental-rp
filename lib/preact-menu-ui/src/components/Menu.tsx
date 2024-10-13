import { useEffect, useState, useCallback } from "preact/hooks";
import { MenuItem } from "./MenuItem";
import { ComponentChildren } from "preact";

type Props = {
  title: string;
  subtitle: string;
  items: { title: string; id: string }[];
  footer?: ComponentChildren | string;
  onSelectItem: (id: string) => void;
  onQuit: () => void;
};

const Menu = ({
  title,
  subtitle,
  items,
  footer,
  onQuit,
  onSelectItem,
}: Props) => {
  const [activeItemId, setActiveItemId] = useState<string>(items[0].id);

  const moveDown = useCallback(() => {
    const currentIndex = items.findIndex((item) => item.id === activeItemId);
    const nextIndex = currentIndex + 1;
    setActiveItemId(items[nextIndex]?.id || items[0].id);
  }, [activeItemId, items]);

  const moveUp = useCallback(() => {
    const currentIndex = items.findIndex((item) => item.id === activeItemId);
    const nextIndex = currentIndex - 1;
    setActiveItemId(items[nextIndex]?.id || items[items.length - 1].id);
  }, [activeItemId, items]);

  const onKeyDown = useCallback(
    ({ code }: KeyboardEvent) => {
      if (code === "ArrowDown") {
        moveDown();
      }

      if (code === "ArrowUp") {
        moveUp();
      }

      if (code === "Enter" || code === "NumpadEnter") {
        onSelectItem(activeItemId);
      }

      if (code === "Backspace" || code === "Escape") {
        onQuit();
      }
    },
    [moveDown, moveUp, onSelectItem, activeItemId, onQuit]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="bg-gray-900/75 rounded-lg text-white w-64">
      <div
        className="text-center pt-4 pb-5 rounded-t-lg"
        style={{
          backgroundImage: "url('./background.jpg')",
          backgroundPositionY: "center",
          backgroundPositionX: "center",
        }}
      >
        <h1
          className="text-3xl font-pacifico"
          style={{
            fontFamily: "Pacifico, cursive",
          }}
        >
          {title}
        </h1>
      </div>
      <div className="text-left mt-1">
        <h2
          className="text-sm ml-4 font-bold mb-2"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {subtitle.toUpperCase()}
        </h2>
        <ul>
          {items.map((item) => (
            <MenuItem active={activeItemId === item.id} key={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </ul>
      </div>
      {footer && <div className="text-center mt-2 pb-2">{footer}</div>}
    </div>
  );
};

export { Menu };
