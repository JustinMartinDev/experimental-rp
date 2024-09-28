import "@lib/react-menu-ui/dist/style.css";
import { Menu } from "@lib/react-menu-ui";
import { useRouter } from "../router";

type Props = {
  footer: React.ReactElement;
};

const ItemMenu = ({ footer }: Props) => {
  const { setView, context } = useRouter();

  const onSelectItem = (id: string) => {
    if (id === "use") {
      console.log("Use item");
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
        { title: "Jeter", id: "drop" },
      ]}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { ItemMenu };
