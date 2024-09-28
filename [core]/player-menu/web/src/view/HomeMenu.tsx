import "@lib/react-menu-ui/dist/style.css";
import { Menu } from "@lib/react-menu-ui";

type Props = {
  footer: React.ReactElement;
};

const HomePlayerMenu = ({ footer }: Props) => {
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
      onSelectItem={(id: string) => console.log("Selected item:", id)}
      footer={footer}
    />
  );
};

export { HomePlayerMenu };
