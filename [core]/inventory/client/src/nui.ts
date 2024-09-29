import { useItem } from "./use-item";

type NUICallbackFunction<ReqBody> = (data: ReqBody, res: Function) => void;

export const registerNUICallback = <T = any>(
  name: string,
  cb: NUICallbackFunction<T>
) => {
  RegisterNuiCallbackType(`inventory:${name}`);
  on(`__cfx_nui:inventory:${name}`, cb);
};

const sendReactMessage = (action: string, data: any) =>
  SendNUIMessage({
    action: `inventory:${action}`,
    data,
  });

export const toggleNuiFrame = (shouldShow: boolean) => {
  SetNuiFocus(shouldShow, shouldShow);
  sendReactMessage("setVisible", shouldShow);
};

export const initNui = () => {
  registerNUICallback("hideFrame", () => {
    toggleNuiFrame(false);
  });

  // Exemple of sending data to React

  registerNUICallback<string>("getClientData", (data, cb) => {
    console.log("Data sent by React", JSON.parse(data));

    const curCoords = GetEntityCoords(PlayerPedId(), true);

    const retData = { x: curCoords[0], y: curCoords[1], z: curCoords[2] };
    cb(retData);
  });

  registerNUICallback<{id: string}>("use-item", async (data, cb) => {
    await useItem(data.id);
    cb();
  });
};
