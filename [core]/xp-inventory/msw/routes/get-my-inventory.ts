import { http, HttpResponse } from "msw";
import { inventoryWithItems } from "@xp-inventory/mocks/inventoryWithItems";

export const handlers = [
  http.post(`https://inventory/inventory:get-my-inventory`, () => {
    return HttpResponse.json(inventoryWithItems);
  }),
];
