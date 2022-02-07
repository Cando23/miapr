const data = {
  datasets: [
    {
      label: "Points",
      data: centroids.concat(points),
      pointStyle: centroids
        .map(() => "triangle")
        .concat(points.map(() => "circle")),
      pointRadius: centroids.map(() => "20").concat(points.map(() => "5")),
      pointBackgroundColor: colors.slice(0, CLUSTERS_COUNT),
      backgroundColor: "grey",
      showLine: false,
    },
  ],
};
const config = {
  type: "scatter",
  data: data,
  options: {
    maintainAspectRation: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "k-means",
      },
    },
  },
};
const chart = new Chart(ctx, config);
setTimeout(main, 1000);
async function main() {
  let oldCentroids;
  let newCentroids;
  do {
    oldCentroids = getCentroids(oldCentroids);
    await assignPoints();
    await resetCentroids();
    newCentroids = getCentroids(newCentroids);
  } while (JSON.stringify(oldCentroids) != JSON.stringify(newCentroids));
  alert("Clusterized!");
};
