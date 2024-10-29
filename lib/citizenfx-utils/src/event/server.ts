type TriggerNetEventParams = {
  event: string;
  source?: number | string;
  params: any;
  callback?: Function;
};

export const triggerClientEvent = ({
  event,
  params,
  source = -1,
}: Omit<TriggerNetEventParams, "callback">) => {
  return new Promise((resolve) => {
    triggerClientEventWithCallback({
      event,
      source,
      params,
      callback: (data: any) => {
        resolve(data);
      },
    });
  });
};

export const triggerClientEventWithCallback = ({
  event,
  params,
  source = -1, // -1 is for all players
  callback = () => {},
}: TriggerNetEventParams) => {
  console.log("source", source);
  on(`response:${event}`, callback);
  emitNet(`request:${event}`, source, JSON.stringify({ ...params, source: source }));
};

type OnClientEventParams = (event: string, callback?: Function) => void;

export const onClientEvent: OnClientEventParams = (
  event,
  callback = () => {}
) => {
  onNet(`request:${event}`, async (params: string, ...args: any[]) => {
    const toReturn = (await callback(JSON.parse(params))) || {};

    const { source, eventUuid } = JSON.parse(params) as { source: number; eventUuid: string; };
    
    console.log("server will respond", `request:${event}`, JSON.stringify(toReturn));
    emitNet(`response:${event}:${eventUuid}`, source, JSON.stringify(toReturn));
  });
};

type OnEventParams = (event: string, callback?: Function) => void;

export const onEvent: OnEventParams = (event, callback = () => {}) => {
  on(`request:${event}`, async (params: string) => {
    const toReturn = await callback(JSON.parse(params));
    emit(`response:${event}`, JSON.stringify(toReturn));
  });
};

export const onStart = (callback: Function) => {
  on("onResourceStart", (resource: string) => {
    if (resource === GetCurrentResourceName()) {
      console.log(`Started server resource ${resource}`);
      callback();
    }
  });
};
