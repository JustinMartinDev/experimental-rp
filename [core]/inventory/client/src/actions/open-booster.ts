import { Item } from "@inventory/types/prisma";
import { triggerServerEvent } from "@lib/event/client";
import { sendReactMessage, toggleNuiFrame } from "@lib/nui/utils";

const CART_IDS = [
  "cart-flash",
  "cart-kitty",
  "cart-gunters"
];

type OpenBoosterParams = {
  size: number
}

export const openBooster = async (params: object) => {

  const { size } = params as OpenBoosterParams;

  if (!size) {
    throw new Error("size is required");
  }

  const cartItems = await triggerServerEvent<Item[]>(
    { event: "get-items", params: {
      itemIds: CART_IDS
    }}
  );

  console.log("cart", cartItems.length)

  const opennedCarts = [];
  for (let i = 0; i < size - 3; i++) {
    const index = Math.floor(Math.random() * cartItems.length);
    opennedCarts.push(cartItems[index]);
  }

  toggleNuiFrame(true);
  sendReactMessage("setView", {
    viewId: "booster-view",
    data: {
      images: opennedCarts.map((item) => {
        const { url } = JSON.parse(item.actionParam) as { url: string };
        return url;
      }),
    },
  });
};