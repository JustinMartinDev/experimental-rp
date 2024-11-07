import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { ComponentChildren } from "preact";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";

import { GetMyInventory } from "@xp-inventory/types/server/client-events/get-character-inventory";

import {
  GetCharactersReturn,
} from "@xp-player/types/server/get-characters";


type Props = {
  footer: ComponentChildren;
};

const HomePlayerMenu = ({ footer }: Props) => {
  const { setView } = useRouter();

  const onSelectItem = async (id: string) => {
    if (id === "open-inventory") {
      const inventory = await fetchNui<GetCharacterInventoryReturn>(
        "get-my-inventory",
        "xp-inventory",
      );

      setView("inventory", inventory);
    }

    if (id === "select-character") {
      const { characters } = await fetchNui<GetCharactersReturn>(
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
