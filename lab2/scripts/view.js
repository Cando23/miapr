const data = {
  datasets: [
    {
      label: "Points",
      data: points,
      pointStyle: "circle",
      pointRadius: "5",
      backgroundColor: "grey",
      showLine: false,
      pointBackgroundColor: [],
    },
    {
      label: "Centroids",
      data: centroids,
      pointStyle: "triangle",
      pointRadius: "25",
      showLine: false,
      pointBackgroundColor: colors,
    },
  ],
};
const config = {
  type: "scatter",
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "k-means",
      },
    },
  },
};
initializeCentroids();
const chart = new Chart(ctx, config);
setTimeout(main, 1000);
async function main() {
  let compute;
  do {
    compute = false;
    await assignPoints();
    compute = await calculateNewCentroid();
  } while (compute);
  alert("Clusterized");
}
