const getCoords = async () => {
  const coords = GetEntityCoords(PlayerPedId(), true);

  console.log(`X: ${coords[0]} Y: ${coords[1]} Z: ${coords[2]}`);
  /**
   * We have territory
   */
};

export const config = {
  name: "get-coords",
  fn: getCoords,
};