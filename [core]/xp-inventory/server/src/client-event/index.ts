import { init as initGetMyInventoryHandler } from "./get-my-inventory";
import { init as initGetItemsHandler } from "./get-items";
import { init as initGetItemHandler } from "./get-item";

export const initClientEventHandlers = () => {
  initGetMyInventoryHandler();
  initGetItemHandler();
  initGetItemsHandler();
};
