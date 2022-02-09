let points = [POINTS_COUNT];
let centroids = [CLUSTERS_COUNT];
function generateNumber() {
  return Math.floor(Math.random() * POINTS_COUNT);
}
function generatePoint() {
  return { x: generateNumber(), y: generateNumber() };
}
function* generatePoints() {
  for (let i = 0; i < POINTS_COUNT; i++) {
    yield generatePoint();
  }
}
function* generateIntitialCentriods() {
  for (let i = 0; i < CLUSTERS_COUNT; i++) {
    yield generatePoint();
  }
}
points = [...generatePoints()];
centroids = [...generateIntitialCentriods()];
