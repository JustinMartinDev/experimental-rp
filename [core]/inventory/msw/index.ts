import { handlers as getMyInventoryHandlers } from "./routes/get-my-inventory";
import { handlers as useItemHandlers } from "./routes/use-item";

export const handlers = [...getMyInventoryHandlers, ...useItemHandlers];
