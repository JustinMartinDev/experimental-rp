type TriggerNetEventParams = {
  event: string;
  playerId?: number;
  params: any;
  callback?: Function;
};

export const triggerClientEvent = ({
  event,
  params,
}: Omit<TriggerNetEventParams, "callback">) => {
  return new Promise((resolve) => {
    triggerClientEventWithCallback({
      event,
      params,
      callback: (data: any) => {
        resolve(data);
      },
    });
  });
};

export const triggerClientEventWithCallback = ({
  event,
  playerId = -1, // -1 is for all players
  params,
  callback = () => {},
}: TriggerNetEventParams) => {
  on(`response:${event}`, callback);
  emitNet(`request:${event}`, JSON.stringify({ ...params, source: playerId }));
};

type OnClientEventParams = (event: string, callback?: Function) => void;

export const onClientEvent: OnClientEventParams = (
  event,
  callback = () => {}
) => {
  onNet(`request:${event}`, async (params: string, ...args: any[]) => {
    const toReturn = await callback(JSON.parse(params));

    const { source } = JSON.parse(params) as { source: number };

    console.log("server", `request:${event}`, JSON.stringify(toReturn))
    emitNet(`response:${event}`, source, JSON.stringify(toReturn));
  });
};

type OnEventParams = (event: string, callback?: Function) => void;

export const onEvent: OnEventParams = (event, callback = () => {}) => {
  on(`request:${event}`, async (params: string) => {
    const toReturn = await callback(JSON.parse(params));
    emit(`response:${event}`, JSON.stringify(toReturn));
  });
};
