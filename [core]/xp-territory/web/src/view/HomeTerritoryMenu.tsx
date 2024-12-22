import { Menu } from "@lib/preact-menu-ui";
import { useRouter } from "@lib/preact-shared/providers/RouterProvider";
import { fetchNui } from "@lib/preact-shared/utils/fetchNui";

import { GetTerritoryReturn } from "@xp-territory/types/server/get-territory";
import { GetCharacterReturn } from "@xp-player/types/server/get-character";

const getMenuContent = ({ territory, character }) => {
  // Territory is not owned by an organization
  if (territory.organizationId === null) {
    return [{ title: "Payer l'informateur", id: "start-claim" }];
  }

  // Character is not in the organization that owns the territory
  if (character.organizationId !== territory.organizationId) {
    return [
      {
        title: "Contester le controle",
        id: "start-contest",
      },
    ];
  }

  return [
    { title: "Payer l'informateur", id: "start-claim" },
    {
      title: "Libérer l'informateur",
      id: "release-territory",
    },
  ];
};

const HomeTerritoryMenu = () => {
  const { setView, getStepContext } = useRouter();

  const onSelectItem = async (id: string) => {};

  const onQuit = async () => {
    await fetchNui("hide-frame");
  };

  const data = getStepContext<GetTerritoryReturn & GetCharacterReturn>("home");

  if (!data) {
    return null;
  }

  const { territory, character } = data;

  const menuContent = getMenuContent({
    territory,
    character,
  });

  return (
    <Menu
      title="Territoire"
      subtitle={territory.name}
      items={menuContent}
      onQuit={onQuit}
      onSelectItem={onSelectItem}
    />
  );
};

export { HomeTerritoryMenu };
