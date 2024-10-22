import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event

I developed a package called [`@lib/event`](https://github.com/JustinMartinDev/experimental-rp/blob/main/lib/event/) to enhance the event management methods provided by FiveM, such as `on`, `emit`, `onNet`, and `emitNet`.

This package introduces a `triggerServerEvent` method that utilizes `Promise`, allowing you to handle events synchronously using the `await` keyword. It operates by emitting an `x:request` event and waiting for the corresponding `x:response` to complete the event flow.

## Schema

<ThemedImage
alt="Event schema"
sources={{
    light: useBaseUrl('/docs/event-light.svg'),
    dark: useBaseUrl('/docs/event-dark.svg'),
  }}
style={{marginBottom: "3vh"}}
/>

### Usage

**Without `@lib/event`**

<Tabs>
  <TabItem value="client.ts" label="client.ts">
    ```ts
    onNet("response:get-players", (params: string) => {
      const players = JSON.parse(params);
      console.log("players-data", players);
    });

    emitNet("request:get-players");
    ```

  </TabItem>

  <TabItem value="server.ts" label="server.ts">
    ```ts
      onNet("request:get-players", async (params: string) => {
        const { source } = JSON.parse(params);

        const players = await prisma.player.findMany();

        emitNet("response:get-players", source, JSON.stringify(players))
      });
    ```

  </TabItem>  
</Tabs>

**With `@lib/event`**

<Tabs>
  <TabItem value="client.ts" label="client.ts">
    ```ts
      const players = await triggerServerEvent("get-players");
      console.log("players-data", players);
    ```

  </TabItem>

  <TabItem value="server.ts" label="server.ts">
    ```ts
    onClientEvent("get-player", async ({ source }: { source: number }) => {
      const players = await prisma.player.findMany();
      return players;
    });
    ```

  </TabItem>  
</Tabs>
