
/**
 * Handler triggered when
 * @param eventName 
 * @param callback 
 */
const onEvent = (
  eventName: string,
  callback: (params: any) => Promise<string | void>
) => {
  on(`request:${eventName}`, async ({ params }: any) => {
    const toReturn = await callback(params);

    emitNet(`response:${eventName}`, JSON.stringify(toReturn));
  });
};

const triggerEvent = async (eventName: string, params: any) => {
  return new Promise((resolve, reject) => {
    emitNet(`request:${eventName}`, params);

    on(`response:${eventName}`, (response: any) => {
      resolve(response);
    });
  });
};
