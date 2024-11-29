import { setupServer } from "msw/node";

import { handlers as inventoryHandlers } from "@xp-inventory/msw";
import { handlers as playerMenuHandlers } from "@xp-player-menu/msw";

export const server = setupServer(...inventoryHandlers, ...playerMenuHandlers);
