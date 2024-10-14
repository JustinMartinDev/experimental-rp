import "@lib/preact-menu-ui/dist/style.css";
import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";
import { InventoryWithItems } from "@inventory/types/prisma";

type Props = {
  footer: ComponentChildren;
};

const InventoryMenu = ({ footer }: Props) => {
  const { setView, getStepContext } = useRouter();

  const onQuit = () => {
    setView("home");
  };

  const onSelectItem = (id: string) => {
    setView("item", {
      id: id,
    });
  };

  const {inventory} = getStepContext<{inventory: InventoryWithItems}>("inventory");

  console.log("inventory", inventory)

  const items = inventory.items.map(({item}) => ({
    title: item.name,
    id: item.id,
  }))

  return (
    <Menu
      title="Personnel"
      subtitle="Inventaire"
      items={items}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { InventoryMenu };
