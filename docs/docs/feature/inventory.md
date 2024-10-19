import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

# Inventory

Our inventory feature is shared around 2 resources `inventory` & `player-menu`

- `player-menu` contain the UI menu
- `inventory` contain each action, and item effect function

## Model

<ThemedImage
alt="Inventory model schema"
sources={{
    light: useBaseUrl('/docs/inventory-model-light.svg'),
    dark: useBaseUrl('/docs/inventory-model-dark.svg'),
  }}
style={{marginBottom: "3vh"}}
/>

## Schema

<ThemedImage
alt="Inventory schema"
sources={{
    light: useBaseUrl('/docs/inventory-schema-light.svg'),
    dark: useBaseUrl('/docs/inventory-schema-dark.svg'),
  }}
style={{marginBottom: "3vh"}}
/>

## Run action

Run action are defined using `actionId` and `actionParam`, a [mapper](https://github.com/JustinMartinDev/experimental-rp/blob/main/%5Bcore%5D/inventory/client/src/actions/index.ts) register pair of function and `actionId`.

This system allow to easly create new generic action, and customize them using `actionParam` values
