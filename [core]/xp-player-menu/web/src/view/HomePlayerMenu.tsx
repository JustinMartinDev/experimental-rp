import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";
import { InventoryWithItems } from "@inventory/types/prisma";
import { Character } from "@player-manager/types/prisma";

import { InventoryWithItems } from "@xp-inventory/types/prisma";
import { Character } from "@xp-player/types/prisma";

type Props = {
  footer: ComponentChildren;
};

const HomePlayerMenu = ({ footer }: Props) => {
  const { setView } = useRouter();

  const onSelectItem = async (id: string) => {
    if (id === "open-inventory") {
      const inventory = await fetchNui<InventoryWithItems>(
        "get-my-inventory",
        "inventory",
      );

      setView("inventory", { inventory: inventory });
    }

    if (id === "select-character") {
      const { characters } = await fetchNui<{ characters: Character[] }>(
        "get-my-characters",
        "xp-player",
      );
      const { characterId } = await fetchNui<{ characterId: number }>(
        "get-my-active-character-id",
        "xp-player",
      );

      setView("character-menu", { characters, characterId });
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
        { title: "Mes personnages", id: "select-character" },
      ]}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
      footer={footer}
    />
  );
};

export { HomePlayerMenu };
