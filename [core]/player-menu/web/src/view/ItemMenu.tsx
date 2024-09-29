import "@lib/react-menu-ui/dist/style.css";
import { Menu } from "@lib/react-menu-ui";
import { useRouter } from "../router";
import { fetchNui } from "../utils/fetchNui";

type Props = {
  footer: React.ReactElement;
};

const ItemMenu = ({ footer }: Props) => {
  const { setView, context } = useRouter();

  const onSelectItem = async (id: string) => {
    if (id === "use") {
      await fetchNui("use-item", "inventory", {
        // @ts-ignore
        id: context.item.id,
      });
    }
  };

  const onQuit = () => {
    setView("inventory");
  };

  return (
    <Menu
      title="Personnel"
      subtitle={
        // @ts-ignore
        context.item.id as string
      }
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
