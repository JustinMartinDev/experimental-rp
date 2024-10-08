# NUI

## Problems

For my NUI, I am familiar with `react` so at start I wanted to use it. But in FiveM all NUI app are displayed inside the page using `<iframe>`. So if you have 4 NUI app, the chrome embedded inside FiveM will have 4 `<iframe>` with builded code of your apps.

So we have 2 problems, Performance and Routing !

### Perfomance

Due to X apps loaded, it will load X times the `react` bundled code. Theses loaded scripts can cause lack of performance !
So firstly to optimize it I thought using [`preact`](https://preactjs.com/) a ligth way to create `react` like app.

| framework | Size  |
| --------- | ----- |
| `react`   | 4kB   |
| `preact`  | 100kb |

An other poin to explore is to focu


- Routing

I use `react` as Nui framework with batch of utils methods allowing to communicate with FiveM client-side. I also use `tailwindcss` for styling the app

## Communicate with client-side

I use `react-query`

## App visibility

`VisibilityProvider`
