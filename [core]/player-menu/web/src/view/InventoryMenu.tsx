import "@lib/react-menu-ui/dist/style.css";
import { Menu } from "@lib/react-menu-ui";
import { useRouter } from "@lib/react-shared/providers/RouterProvider";

type Props = {
  footer: React.ReactElement;
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
        { title: "Carte Junior", id: "card-junior" },
        { title: "Carte Flash", id: "card-flash" },
      ]}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { InventoryMenu };
