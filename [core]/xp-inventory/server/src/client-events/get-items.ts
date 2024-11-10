import { prisma } from "@lib/database";

type OnGetItemsEventParams = {
  source: number;
  itemIds: string[];
};

export const getItems = async ({ source, itemIds }: OnGetItemsEventParams) => {
  const items = await prisma.item.findMany({
    where: {
      id: {
        in: itemIds,
      },
    },
  });

  return items;
};

export const config = {
  name: "get-items",
  fn: getItems,
};
