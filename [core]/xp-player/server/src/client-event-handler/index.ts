import { init as initGetMe } from "./get-me";
import { init as initGetPlayers } from "./get-players";

export const initClientEventHandlers = () => {
  initGetMe();
  initGetPlayers();
};
