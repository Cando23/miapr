function initializeCentroids() {
  setCentroid(0, points[0], 1);
  const point = getSecondPoint();
  setCentroid(point.index, points[point.index], 2);
}
function getSecondPoint() {
  let distances = points.map((point) => getEuclidDistance(point, centroids[0]));
  const max = Math.max.apply(null, distances);
  const index = distances.indexOf(max);
  return { index: index, value: max };
}
function assignPoints() {
  return new Promise(async (resolve) => {
    points.forEach((point, i) => {
      let distances = centroids.map((centroid) =>
        getEuclidDistance(point, centroid)
      );
      const clusterIndex = getClusterIndex(distances);
      chart.data.datasets[0].pointBackgroundColor[i] =
        chart.data.datasets[1].pointBackgroundColor[clusterIndex];
      points[i].cluster = centroids[clusterIndex].cluster;
    });
    chart.update(100);
    await new Promise((resolve) => setTimeout(resolve, 100));
    resolve();
  });
}
function calculateNewCentroid(compute) {
  return new Promise(async (resolve) => {
    let max = getMaxDistance();
    const average = getAverageDistance();
    if (max.len > average) {
      setCentroid(max.index, points[max.index], centroids.length + 1);
      compute = true;
      chart.update(100);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    resolve(compute);
  });
}
function getEuclidDistance(point, centroid) {
  return Math.sqrt(
    Math.pow(centroid.x - point.x, 2) + Math.pow(centroid.y - point.y, 2)
  );
}
function setCentroid(i, centroid, cluster) {
  colors.push(randomColor());
  points[i].centroid = true;
  centroid.cluster = cluster;
  centroids.push(centroid);
}
function getClusterIndex(distances) {
  const min = Math.min.apply(Math, distances);
  return distances.indexOf(min);
}
function getMaxDistances() {
  let distances = [];
  for (let i = 0; i < centroids.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (
        points[j].centroid === false &&
        points[j].cluster === centroids[i].cluster
      ) {
        distances.push({
          index: j,
          p: points[j],
          len: getEuclidDistance(points[j], centroids[i]),
        });
      }
    }
  }
  return distances;
}
function getMaxDistance() {
  const distances = getMaxDistances();
  let max = 0;
  let index = -1;
  for (let j = 0; j < distances.length; j++) {
    if (distances[j].len > max) {
      max = distances[j].len;
      index = j;
    }
  }
  return distances[index];
}
function getAverageDistance() {
  let average = 0;
  let count = 0;
  for (let i = 0; i < centroids.length - 1; i++) {
    for (let j = i + 1; j < centroids.length; j++) {
      average += getEuclidDistance(centroids[i], centroids[j]);
      count++;
    }
  }
  return average / (count * 2);
}
