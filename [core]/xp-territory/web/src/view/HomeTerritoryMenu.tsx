import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";

const HomePlayerMenu = () => {
  const { setView } = useRouter();

  const onSelectItem = async (id: string) => {};

  const onQuit = async () => {
    await fetchNui("hide-frame");
  };

  return (
    <Menu
      title="Territory"
      subtitle="<name of territory>"
      items={[
        { title: "Inventaire", id: "open-inventory" },
        { title: "Portefeuille", id: "open-wallet" },
        { title: "Porte-clés", id: "open-bunch-of-keys" },
        { title: "Ouvrir le coffre", id: "open-car-boot" },
        { title: "Donner Arme", id: "give-weapon" },
        { title: "Mes personnages", id: "select-character" },
      ]}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
    />
  );
};

export { HomePlayerMenu };
