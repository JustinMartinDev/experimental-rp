import "@lib/preact-menu-ui/index.css";
import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";
import { GetCharacterInventoryReturn } from "@xp-inventory/types/server/client-events/get-character-inventory";

type Props = {
  footer: ComponentChildren;
};

const InventoryMenu = ({ footer }: Props) => {
  const { setView, getStepContext } = useRouter();

  const { inventory } =
    getStepContext<GetCharacterInventoryReturn>("inventory");

  const items = inventory.items.map(({ item }) => ({
    title: item.name,
    id: item.id,
  }));

  const onQuit = () => {
    setView("home");
  };

  const onSelectItem = (id: string) => {
    setView("item", {
      itemId: id,
      inventoryId: inventory.id,
    });
  };

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
