let points = [POINTS_COUNT];
let centroids = [CLUSTERS_COUNT];
function generateNumber() {
  return Math.floor(Math.random() * POINTS_COUNT);
}
function generatePoint() {
  return { x: generateNumber(), y: generateNumber() };
}
function generatePoints(points) {
  for (let i = 0; i < POINTS_COUNT; i++) {
    points[i] = generatePoint();
  }
  return points;
}
function setIntitialCentriods(centroids) {
  for (let i = 0; i < CLUSTERS_COUNT; i++) {
    centroids[i] = generatePoint();
  }
  return centroids;
}
points = generatePoints(points);
centroids = setIntitialCentriods(centroids);
