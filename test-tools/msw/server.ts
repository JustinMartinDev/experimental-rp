import { setupServer } from "msw/node";

import { handlers as inventoryHandlers } from "@inventory/msw";
import { handlers as playerMenuHandlers } from "@player-menu/msw";

export const server = setupServer(...inventoryHandlers, ...playerMenuHandlers);
