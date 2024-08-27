/**
 * server --> client
 * Handler triggered when server send an event to client
 * @param eventName
 * @param callback
 */
const onServerEvent = (
  eventName: string,
  callback: (params: any) => Promise<string | void>
) => {
  on(`client:request:${eventName}`, async ({ params }: any) => {
    const toReturn = await callback(params);

    emitNet(`server:response:${eventName}`, JSON.stringify(toReturn));
  });
};

/**
 * server --> client
 * Trigger server event and return promise response
 * @param eventName
 * @param params
 * @return Promise
 */
const triggerServerEvent = async (eventName: string, params: any) => {
  return new Promise((resolve, reject) => {
    emitNet(`server:request:${eventName}`, params);

    on(`client:response:${eventName}`, (response: any) => {
      resolve(response);
    });
  });
};

/**
 * client --> client
 * Handler triggered when server send an event to client
 * @param eventName
 * @param callback
 */
const onClientEvent = (
  eventName: string,
  callback: (params: any) => Promise<string | void>
) => {
  on(`client:request:${eventName}`, async ({ params }: any) => {
    const toReturn = await callback(params);

    emit(`client:response:${eventName}`, JSON.stringify(toReturn));
  });
};

/**
 * client --> client
 * Trigger client event and return promise response
 * @param eventName
 * @param params
 * @return Promise
 */
const triggerClientEvent = async (eventName: string, params: any) => {
  return new Promise((resolve, reject) => {
    emit(`client:request:${eventName}`, params);

    on(`client:response:${eventName}`, (response: any) => {
      resolve(response);
    });
  });
};
