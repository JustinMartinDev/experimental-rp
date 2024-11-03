import { prisma } from "@lib/database";

type OnGetItemEventParams = {
  source: number;
  itemId: string;
};

export const onGetItemEvent = async ({
  source,
  itemId,
}: OnGetItemEventParams) => {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });

  return item;
};

export const config = {
  name: "get-item",
  fn: onGetItemEvent,
};
