const data = {
  labels: [
    -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4,
  ],
  datasets: [
    {
      type: "scatter",
      label: "Class 1",
      showLine: false,
      backgroundColor: "red",
      data: [],
    },
    {
      type: "scatter",
      showLine: false,
      label: "Class 2",
      backgroundColor: "blue",
      data: [],
    },
    {
      type: "line",
      label: "Function",
      backgroundColor: "yellow",
      borderColor: "yellow",
      data: leftBranch,
      tension: 0.2,
    },
    {
      type: "line",
      label: "Function",
      backgroundColor: "yellow",
      borderColor: "yellow",
      data: rightBranch,
      tension: 0.2,
    },
  ],
};
const config = {
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "Potential classification",
      },
    },
  },
};
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, config);
let testObjects = [...generateTestObjects()];
let compiledFunction = fnc.compile();
testObjects.forEach((object) => classify(object, compiledFunction));
chart.update();

function classify(testObject, compiledFunction) {
  let coefficient = compiledFunction.evaluate({
    x1: testObject.x,
    x2: testObject.y,
  });
  if (coefficient > 0) chart.data.datasets[0].data.push(testObject);
  else chart.data.datasets[1].data.push(testObject);
}
function* generateTestObjects() {
  for (let j = 0; j < 1000; j++)
    yield { x: randomAttribute(-4, 3), y: randomAttribute(-4, 3) };
}
function randomAttribute(min, max) {
  return Math.random() * (max - min + 1) + min;
}
