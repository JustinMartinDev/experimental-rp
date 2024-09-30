type NUICallbackFunction<ReqBody> = (data: ReqBody, res: Function) => void;

export const registerNUICallback = <T = any>(
  name: string,
  cb: NUICallbackFunction<T>
) => {
  const resourceName = GetCurrentResourceName();

  RegisterNuiCallbackType(`${resourceName}:${name}`);
  on(`__cfx_nui:${resourceName}:${name}`, cb);
};

export const sendReactMessage = (action: string, data: any) =>
  SendNUIMessage({
    action: `${GetCurrentResourceName()}:${action}`,
    data,
  });

export const toggleNuiFrame = (shouldShow: boolean) => {
  SetNuiFocus(shouldShow, shouldShow);
  sendReactMessage("setVisible", shouldShow);
};
