type TriggerNetEventParams = {
  event: string;
  params: any;
  callback: Function;
};

export const triggerServerEvent = ({
  event,
  params,
}: Omit<TriggerNetEventParams, "callback">) => {
  return new Promise((resolve) => {
    triggerServerEventWithCallback({
      event,
      params,
      callback: (data: any) => {
        resolve(data);
      },
    });
  });
};

export const triggerServerEventWithCallback = ({
  event,
  params,
  callback = () => {},
}: TriggerNetEventParams) => {
  on(`response:${event}`, callback);
  emitNet(
    `request:${event}`,
    JSON.stringify({ ...params, source: PlayerId() })
  );
};

type OnServerEventParams = (event: string, callback?: Function) => void;

export const onServerEvent: OnServerEventParams = (
  event,
  callback = () => {}
) => {
  onNet(`request:${event}`, async (params: string) => {
    const toReturn = await callback(JSON.parse(params));
    emitNet(`response:${event}`, JSON.stringify(toReturn));
  });
};
