function* getCentroids() {
  for (let i = 0; i < CLUSTERS_COUNT; i++) {
    yield chart.data.datasets[0].data[i];
  }
}
function* initializeClusters() {
  for (let i = 0; i < CLUSTERS_COUNT; i++) {
    yield [];
  }
}
function assignPoints() {
  return new Promise(async (resolve) => {
    points.forEach((point, i) => {
      let distances = [];
      for (let j = 0; j < CLUSTERS_COUNT; j++) {
        const centroid = chart.data.datasets[0].data[j];
        distances.push(getEuclidDistance(point, centroid));
      }
      chart.data.datasets[0].pointBackgroundColor[i + CLUSTERS_COUNT] =
        chart.data.datasets[0].pointBackgroundColor[getClusterIndex(distances)];
    });
    chart.update(10);
    await new Promise((resolve) => setTimeout(resolve, 10));
    resolve();
  });
}
function resetCentroids() {
  return new Promise(async (resolve) => {
    const clusters = getClusters();
    clusters.forEach((cluster, i) => {
      let x = 0;
      let y = 0;
      cluster.forEach((point) => {
        x += point.x;
        y += point.y;
      });
      if (cluster.length)
        chart.data.datasets[0].data[i] = {
          x: Math.floor(x / cluster.length),
          y: Math.floor(y / cluster.length),
        };
    });
    chart.update(10);
    await new Promise((resolve) => setTimeout(resolve, 10));
    resolve();
  });
}

function getEuclidDistance(point, centroid) {
  return Math.sqrt(
    Math.pow(centroid.x - point.x, 2) + Math.pow(centroid.y - point.y, 2)
  );
}
function getClusters() {
  let clusters = [...initializeClusters()];
  const dataset = chart.data.datasets[0];
  for (let i = CLUSTERS_COUNT; i < dataset.data.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      if (dataset.pointBackgroundColor[i] === colors[j]) {
        clusters[j].push(dataset.data[i]);
      }
    }
  }
  return clusters;
}
const getClusterIndex = (distances) => {
  const min = Math.min.apply(Math, distances);
  return distances.indexOf(min);
};
