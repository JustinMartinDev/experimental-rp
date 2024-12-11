// Define the 3D polygon zone
const polygonZone = {
  vertices: [
    { x: 0, y: 0, z: 0 }, // Point 1
    { x: 10, y: 0, z: 0 }, // Point 2
    { x: 10, y: 10, z: 0 }, // Point 3
    { x: 0, y: 10, z: 0 }, // Point 4
  ],
  height: { min: 0, max: 10 }, // Height range of the prism
};

// Function to check if a point is inside the 3D polygon zone
export function isPointInZone3D(
  point: { x: number; y: number; z: number },
  zone: typeof polygonZone,
): boolean {
  const vertices2D = zone.vertices.map(({ x, y }) => ({ x, y }));

  // Check if within 2D polygon
  const isInside2D = isPointInPolygon2D(point, vertices2D);

  // Check if within height range
  if (isInside2D && point.z >= zone.height.min && point.z <= zone.height.max) {
    return true;
  }

  return false;
}

// Function to check if a point is inside a 2D polygon using ray-casting
function isPointInPolygon2D(
  point: { x: number; y: number },
  polygon: { x: number; y: number }[],
): boolean {
  const { x, y } = point;
  let isInside = false;

  let j = polygon.length - 1;
  for (let i = 0; i < polygon.length; i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y;
    const xj = polygon[j].x,
      yj = polygon[j].y;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) {
      isInside = !isInside;
    }
    j = i;
  }

  return isInside;
}
