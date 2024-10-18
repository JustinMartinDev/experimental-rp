# Event

I developed a package called [`@lib/event`](https://github.com/JustinMartinDev/experimental-rp/blob/main/lib/event/) to enhance the event management methods provided by FiveM, such as `on`, `emit`, `onNet`, and `emitNet`.

This package introduces a `triggerServerEvent` method that utilizes `Promise`, allowing you to handle events synchronously using the `await` keyword. It operates by emitting an `x:request` event and waiting for the corresponding `x:response` to complete the event flow.

## Schema

Schema about exchange of trigger (todo)

### Usage

**Before**

Tab client
Tab server

**After**

Tab client
Tab server
