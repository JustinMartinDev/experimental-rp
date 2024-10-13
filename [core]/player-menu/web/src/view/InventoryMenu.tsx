import "@lib/preact-menu-ui/dist/style.css";
import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";

type Props = {
  footer: ComponentChildren;
};

const InventoryMenu = ({ footer }: Props) => {
  const { setView } = useRouter();

  const onQuit = () => {
    setView("home");
  };

  const onSelectItem = (id: string) => {
    setView("item", {
      id: id,
    });
  };

  return (
    <Menu
      title="Personnel"
      subtitle="Inventaire"
      items={[
        { title: "Carte Kitty", id: "card-kitty" },
        { title: "Carte Gunter", id: "card-gunter" },
        { title: "Carte Flash", id: "card-flash" },
        { title: "Booster FD", id: "fd-booster" },
      ]}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { InventoryMenu };
