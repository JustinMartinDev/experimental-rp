
type TriggerNetEventParams = {
  event: string;
  params?: any;
  callback: Function;
};

/* === Trigger Server Event === */

export const triggerServerEvent = <ResolveType>({
  event,
  params = {},
}: Omit<TriggerNetEventParams, "callback">) => {
  return new Promise<ResolveType>((resolve) => {
    triggerServerEventWithCallback({
      event,
      params,
      callback: (data: string) => {
        resolve(JSON.parse(data) as ResolveType);
      },
    });
  });
};

export const triggerServerEventWithCallback = ({
  event,
  params,
  callback = () => {},
}: TriggerNetEventParams) => {
  const source = GetPlayerServerId(PlayerId());

  const uuid = Math.random().toString(36).substring(7); // Random string

  const requestEvent = `request:${event}`;
  const responseEvent = `response:${event}:${uuid}`;

  const onNetCallback = async (params: unknown) => {
    removeEventListener(responseEvent, onNetCallback);
    await callback(params);
  };

  onNet(responseEvent, onNetCallback);
  emitNet(requestEvent, JSON.stringify({ ...params, source, eventUuid: uuid }));
};

/* === Trigger Client Event === */

export const triggerClientEvent = <ResolveType>({
  event,
  params = {},
}: Omit<TriggerNetEventParams, "callback">) => {
  return new Promise<ResolveType>((resolve) => {
    triggerClientEventWithCallback({
      event,
      params,
      callback: (data: string) => {
        resolve(JSON.parse(data) as ResolveType);
      },
    });
  });
};

export const triggerClientEventWithCallback = ({
  event,
  params,
  callback = () => {},
}: TriggerNetEventParams) => {
  const uuid = Math.random().toString(36).substring(7); // Random string

  const requestEvent = `request:${event}`;
  const responseEvent = `response:${event}:${uuid}`;

  const onNetCallback = async (params: unknown) => {
    removeEventListener(responseEvent, onNetCallback);
    await callback(params);
  };

  on(responseEvent, onNetCallback);
  emit(requestEvent, JSON.stringify({ ...params, eventUuid: uuid }));
};

/* === Event Listener === */

type OnServerEventParams = (event: string, callback?: Function) => void;

export const onServerEvent: OnServerEventParams = (
  event,
  callback = () => {},
) => {
  onNet(`request:${event}`, async (params: string) => {
    const toReturn = await callback(JSON.parse(params));
    emitNet(`response:${event}`, JSON.stringify(toReturn));
  });
};

export const onStart = (callback: Function) => {
  on("onResourceStart", (resource: string) => {
    if (resource === GetCurrentResourceName()) {
      console.log(`Started client resource ${resource}`);
      callback();
    }
  });
};
