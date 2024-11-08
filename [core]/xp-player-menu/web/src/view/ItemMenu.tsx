import "@lib/preact-menu-ui/index.css";
import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";
import { ComponentChildren } from "preact";

type Props = {
  footer: ComponentChildren;
};

type ItemStepContext = {
  itemId: string;
  inventoryId: number;
};

const ItemMenu = ({ footer }: Props) => {
  const { setView, getStepContext } = useRouter();

  const { itemId, inventoryId } = getStepContext<ItemStepContext>("item");

  const onSelectItem = async (id: string) => {
    if (id === "use") {
      await fetchNui("use-item", "inventory", {
        itemId: itemId,
        inventoryId,
      });
    }
  };

  const onQuit = () => {
    setView("inventory");
  };

  return (
    <Menu
      title="Personnel"
      subtitle={"Que faire ?"}
      items={[
        { title: "Utiliser", id: "use" },
        { title: "Donner", id: "give" },
        { title: "Jeter", id: "drop" },
      ]}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { ItemMenu };
