import "@lib/preact-menu-ui/dist/style.css";
import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";

type Props = {
  footer: ComponentChildren;
};

const HomePlayerMenu = ({ footer }: Props) => {
  const { setView } = useRouter();

  const onSelectItem = (id: string) => {
    if (id === "open-inventory") {
      setView("inventory");
    }
  };

  return (
    <Menu
      title="Personnel"
      subtitle="Personnel"
      items={[
        { title: "Inventaire", id: "open-inventory" },
        { title: "Portefeuille", id: "open-wallet" },
        { title: "Porte-clés", id: "open-bunch-of-keys" },
        { title: "Ouvrir le coffre", id: "open-car-boot" },
        { title: "Donner Arme", id: "give-weapon" },
      ]}
      onQuit={() => console.log("Quit menu")}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { HomePlayerMenu };
