
/**
 * Type of method and const exported by client and server package
 */
export type SpawnmanagerExports = {
  client: {
    spawnPlayer: (
      spawnParams: {x: number; y: number; z: number, model: string},      
      callback: Function
    ) => void
    setAutoSpawn: (enabled: boolean) => void;
    setAutoSpawnCallback: (
      callback: Function
    ) => void;
    forceRespawn: () => void
  }
}