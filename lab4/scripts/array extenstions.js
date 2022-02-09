Array.prototype.sumVectors = function (vector) {
  return this.map((value, index) => value + vector[index]);
};
Array.prototype.subVectors = function (vector) {
  return this.map((value, index) => value - vector[index]);
};
Array.prototype.multiplyVectors = function (vector) {
  return this.map((value, index) => value * vector[index]);
};

Array.prototype.sumElements = function () {
  return this.reduce((a, b) => a + b);
};
Array.prototype.maxIndex = function () {
  return this.indexOf(Math.max(...this));
};
