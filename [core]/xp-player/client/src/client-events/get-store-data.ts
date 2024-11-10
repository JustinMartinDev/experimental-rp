import XpPlayerStore from "../store";

import {
  GetStoreDataParam,
  GetStoreDataReturn,
} from "@xp-player/types/client/get-store-data";

const getStoreData = async ({ property }: GetStoreDataParam) => {
  console.log("getStoreData", property);

  const value = XpPlayerStore[property];

  return {
    [property]: value,
  } as GetStoreDataReturn;
};

export const config = {
  name: "get-store-data",
  fn: getStoreData,
};
