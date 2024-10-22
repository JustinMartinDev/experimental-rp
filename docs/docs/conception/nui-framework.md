import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# NUI

## Problems

For my NUI, I am familiar with `react` so at start I wanted to use it. But in FiveM all NUI app are displayed inside the page using `<iframe>`. So if you have 4 NUI app, the chrome embedded inside FiveM will have 4 `<iframe>` with builded code of your apps.

So we have 2 problems, Performance and Routing !

### Perfomance

Due to X apps loaded, it will load X times the `react` bundled code. Theses loaded scripts can cause lack of performance !
So firstly to optimize it I thought using [`preact`](https://preactjs.com/) a ligth way to create `react` like app.

| framework | Size   |
| --------- | ------ |
| `react`   | 1000kB |
| `preact`  | 4kB    |

### External framework

Web-based bundlers like `Webpack`, `Vite`, and others allow you to specify external dependencies. This means you can mark certain dependencies to be excluded from the bundled output. Instead of being bundled, these external dependencies will be loaded separately, typically from a CDN or another source, as defined by the developer. This approach helps optimize bundle size and improve loading performance.

So it's possible to define something like that :

<ThemedImage
alt="Nui framework load schema"
sources={{
    light: useBaseUrl('/docs/nui-framework-dep-light.svg'),
    dark: useBaseUrl('/docs/nui-framework-dep-dark.svg'),
  }}
style={{marginBottom: "3vh"}}
/>

`[system]/preact` is bundled with `preact` and set it in parent `window.preact` :

<Tabs>
  <TabItem value="fxmanifest.lua" label="[system]/preact/fxmanifest.lua">
  
   ```
   fx_version 'cerulean'

name 'preact'
version '1.0.0'

game 'gta5'

ui_page 'index.html'

files {
  'index.html',
  'preact.min.js',
}

````

</TabItem>

<TabItem value="preact/index.html" label="[system]/preact/index.html">
 ```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="./preact.min.js"></script>
    <title>Preact setup</title>
  </head>
  <body>
    <script>
      window.onload = () => {
        window.parent.preact = window.preact
        console.log("preact loaded - set in parent window")
      }
    </script>
  </body>
</html>
````

  </TabItem>

  <TabItem value="player-memu/index.html" label="[core]/player-menu/index.html">
 ```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Player menu</title>
    <script>
      window.onload = () => {
        window.preact = window.parent.preact
        console.log("preact loaded from parent window")
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
````

  </TabItem>
</Tabs>

## Routing

As NUI work in `iframe` context i do not use routing by url by using `react-router`, and update the path. I create a custom one not connected to location API, so it do not update history, ...

- [RouterProvider](https://github.com/JustinMartinDev/experimental-rp/blob/main/lib/preact-shared/providers/RouterProvider.tsx") work with map of view and context object
- [Router](https://github.com/JustinMartinDev/experimental-rp/blob/main/%5Bcore%5D/player-menu/web/src/router.tsx) use of `RouterProvider`
- [ItemMenu](https://github.com/JustinMartinDev/experimental-rp/blob/main/%5Bcore%5D/player-menu/web/src/view/ItemMenu.tsx) use context and hook provided by `RouterProvider`

## Communicate with client-side

I use `react-query` from tanstack with custom fetcher. I use the same protocole about routes handleling and events.

In fact, in client-side of resource when i registered an NUI event with:

```ts
RegisterNuiCallbackType("player-menu:open");
on("__cfx_nui:player-menu:open", cb);
```

This event will be trigger when NUI frame request http://player-menu/player-menu:open so it possible to trigger NUI callback from other resource source. You can find this between `player-menu` and `inventory`, when `player-menu` NUI call the `use-item` callback from `iventory` resource.

You can find an usage of `fetchNui` method [here](https://justinmartindev.github.io/experimental-rp/docs/core/preact-shared#fetchnui).

## App visibility

As we have multiple `<iframe>`, on for each resource using NUI, we have to manage the visibility of each frame. I created a [`VisibilityProvider`](https://github.com/JustinMartinDev/experimental-rp/blob/main/lib/preact-shared/providers/VisibilityProvider.tsx) allowing to hide and display frame.
