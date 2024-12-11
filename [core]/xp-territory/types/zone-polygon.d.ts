export type PolygonPoint = { x: number; y: number; z: number };

export type PolygonZone = {
  vertices: PolygonPoint[];
  height: { min: number; max: number };
};
