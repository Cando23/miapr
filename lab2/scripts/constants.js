const POINTS_COUNT = 10000;
const ctx = document.getElementById("chart").getContext("2d");
const randomColor = () =>
  "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
