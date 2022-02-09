let colors = [];
let points = [POINTS_COUNT];
let centroids = [];

function generateNumber() {
  return Math.floor(Math.random() * POINTS_COUNT);
}
function generatePoint() {
  return {
    x: generateNumber(),
    y: generateNumber(),
    cluster: -1,
    centroid: false,
  };
}
function* generatePoints() {
  for (let i = 0; i < POINTS_COUNT; i++) {
    yield generatePoint();
  }
}
points = [...generatePoints()];
