import { setupServer } from "msw/node";

import { handlers as inventoryHandler } from "@inventory/msw";

export const server = setupServer(...inventoryHandler);
