# Preact shared

I developed a package called [`@lib/preact-shared`](https://github.com/JustinMartinDev/experimental-rp/blob/main/lib/preact-shared/) to provide Preact component, hooks and utils method

## Hooks

### `useNuiEvent`

| name          | description                                                           |
| ------------- | --------------------------------------------------------------------- |
| `useNuiEvent` | hook triggering callback when specific event received in web resource |

```tsx
const onNuiReceived = (params: string) => {
  console.log("received event with param:", params);
};

useNuiEvent<{ params: string }>("on-nui-received", onNuiReceived);
```

It will be triggered by this code in client-side :

```ts
SendNUIMessage({
  action: `${GetCurrentResourceName()}:on-nui-received`,
  data: { params: "My data as param" },
});
```

## Providers

### `RouterProvider`

| name             | description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `RouterProvider` | Provider managing the routing using map of views. It also contain context storage for each view |

Usage :

```tsx
const MapView = {
  "inventory-home": <div>Inventory home</div>,
  "item-view": <div>Item view</div>,
};

export const Router = () => <RouterProvider mapView={MapView} />;
```

Client side can change the view with NUI message:

```ts
SendNUIMessage({
  action: `${GetCurrentResourceName()}:set-view`,
  data: { viewId: "inventory-home" },
});
```

### `VisibilityProvider`

| name                 | description                                                                    |
| -------------------- | ------------------------------------------------------------------------------ |
| `VisibilityProvider` | Provider allow to manage the display css property `visibility` of NUI `iframe` |

Usage :

```tsx
export const App = () => (
  <VisibilityProvider>
    <Router />
  </VisibilityProvider>
);
```

Client side can change the view with NUI message:

```ts
// Will show the NUI frame
SendNUIMessage({
  action: `${GetCurrentResourceName()}:set-visible`,
  data: true,
});

// Will hide the NUI frame
SendNUIMessage({
  action: `${GetCurrentResourceName()}:set-visible`,
  data: false,
});
```

## Utils

### `fetchNui`

| name       | description                                                           |
| ---------- | --------------------------------------------------------------------- |
| `fetchNui` | Method use to trigger registered callback in client side of resources |

Usage :

On the resource `inventory`, in client-side we have :

```ts
registerNUICallback<{ id: string }>("use-item", async (data, cb) => {
  cb();
  await useItem(data.id);
});
```

from NUI of reousrce `player-menu`, use this code to trigger the callback :

```ts
await fetchNui("use-item", "inventory", {
  id: context.item.id,
});
```

### `mockTriggerNuiEvent(s)`

| name                   | description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `mockTriggerNuiEvent`  | Method use to fake trigger useNuiEvent for testing          |
| `mockTriggerNuiEvents` | Method use to fake trigger multipel useNuiEvent for testing |
