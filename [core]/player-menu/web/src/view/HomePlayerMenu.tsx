import "@lib/preact-menu-ui/index.css";
import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";

type Props = {
  footer: ComponentChildren;
};

const HomePlayerMenu = ({ footer }: Props) => {
  const { setView } = useRouter();

  const onSelectItem = async (id: string) => {
    if (id === "open-inventory") {
      const inventory = await fetchNui<string>("get-my-inventory", "inventory");

      setView("inventory", { inventory: inventory });
    }
  };

  const onQuit = async () => {
    await fetchNui("hide-frame");
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
      onQuit={onQuit}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { HomePlayerMenu };
