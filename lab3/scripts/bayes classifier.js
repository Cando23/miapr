const reducer = (previousValue, currentValue) => previousValue + currentValue;
const N = 50,
  pc1 = 0.5,
  pc2 = 0.5;
let mu = 0.6;//for matching with silver explanation doc
const x1 = initializeVector(N),
  x2 = initializeVector(N);
const mu1 = mean(x1) * mu,
  mu2 = mean(x2) * ++mu;
const sigma1 = standardDeviation(x1, mu1),
  sigma2 = standardDeviation(x2, mu2);
const range = [0, Math.max(...[Math.max(...x1), Math.max(...x2)])];
let x = linspace(range[0], range[1], N);
let pxc1 = normal(x, mu1, sigma1),
  pxc2 = normal(x, mu2, sigma2);
const y1 = pxc1.map((i) => i * pc1),
  y2 = pxc2.map((i) => i * pc2);

const max = Math.max(...y2);
const index = y2.indexOf(max);
const deltas = y1.slice(0, index).map((y, i) => Math.abs(y - y2[i]));
const min = Math.min(...deltas);
const intersection = deltas.indexOf(min);
const falseZone =
  y2.slice(0, intersection).reduce(reducer) / y2.reduce(reducer);
const skipZone = y1.slice(intersection, N).reduce(reducer) / y1.reduce(reducer);
const classificationMistake = falseZone + skipZone;
console.log("false Zone", falseZone);
console.log("skip Zone", skipZone);
console.log("classification mistake", classificationMistake);

//ND - Normal Distribution
function randomND() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.abs(Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v));
}
function initializeVector(n) {
  let x = [];
  for (let i = 0; i < n; i++) {
    x.push(randomND());
  }
  return x;
}
function mean(x) {
  return x.reduce((a, b) => a + b) / x.length;
}

function standardDeviation(x, u) {
  return (
    x
      .map((element) => {
        return Math.pow(element - u, 2);
      })
      .reduce(reducer) / x.length
  );
}
function linspace(start, stop, num, endpoint = true) {
  const div = endpoint ? num - 1 : num,
    step = (stop - start) / div;
  return Array.from({ length: num }, (_, i) => start + step * i);
}
function normal(x, mu, sigma) {
  return x.map(
    (i) =>
      (1 / (sigma * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((i - mu) / sigma, 2))
  );
}
