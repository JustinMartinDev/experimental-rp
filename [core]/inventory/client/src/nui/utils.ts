
type NUICallbackFunction<ReqBody> = (data: ReqBody, res: Function) => void;

export const registerNUICallback = <T = any>(
  name: string,
  cb: NUICallbackFunction<T>
) => {
  RegisterNuiCallbackType(`inventory:${name}`);
  on(`__cfx_nui:inventory:${name}`, cb);
};

export const sendReactMessage = (action: string, data: any) =>
  SendNUIMessage({
    action: `inventory:${action}`,
    data,
  });

export const toggleNuiFrame = (shouldShow: boolean) => {
  SetNuiFocus(shouldShow, shouldShow);
  sendReactMessage("setVisible", shouldShow);
};