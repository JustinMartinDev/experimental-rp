import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { useState, useEffect } from "preact/hooks";

import { fetchNui } from "@lib/preact-shared/utils/fetchNui";
import { Character } from "@xp-player/types/prisma";

type Context = {
  characters: Character[];
  characterId: number;
};

const SelectCharacterMenu = () => {
  const { getStepContext, setView } = useRouter();

  const { characters } = getStepContext<Context>("character-menu");

  const [activeCharacterId, setActiveCharacterId] = useState<
    undefined | number
  >();

  useEffect(() => {
    const { characterId } = getStepContext<Context>("character-menu");

    setActiveCharacterId(characterId);
  }, []);

  const handleSelectCharacter = async (id: string) => {
    const selectedCharacterId = Number(id);

    if (activeCharacterId === selectedCharacterId) return;

    try {
      await fetchNui("set-active-character", "player-manager", {
        characterId: selectedCharacterId,
      });
    } catch (err) {
      console.error(err);
    }

    setActiveCharacterId(selectedCharacterId);
  };

  const onQuit = async () => {
    setView("home");
  };

  const items = characters.map(({ firstname, lastname, id }) => ({
    title:
      id !== activeCharacterId
        ? `${firstname} ${lastname}`
        : `${firstname} ${lastname} (actuel)`,
    id: `${id}`,
  }));

  return (
    <Menu
      title="Personnagnes"
      subtitle="Sélectionnez un personnage"
      items={items}
      onQuit={onQuit}
      onSelectItem={handleSelectCharacter}
    />
  );
};

export { SelectCharacterMenu };
