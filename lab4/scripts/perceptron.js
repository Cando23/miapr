// [
//   [0, 0, 1],
//   [1, 1, 1],
//   [-1, 1, 1],
// ];
class Perceptron {
  constructor(classCount, attributesCount) {
    this.classCount = classCount;
    this.attributesCount = attributesCount;
    this.classes = [...this.generateVectors(true)];
    this.trainigVectors = [...this.generateVectors(false)];
  }
  train() {
    let j = 0;
    let mistakes = false;
    let training = true;
    while (training) {
      let estimates = [...this.estimate(j)];
      let correct = this.checkProduct(estimates, j);
      if (!correct) {
        this.classes = this.updateClasses(j);
        if (!mistakes) mistakes = true;
      }

      if (j < this.classCount - 1) {
        mistakes = false;
        j++;
      } else {
        if (!mistakes) training = false;
        j = 0;
      }
    }
    console.log(this.classes);
  }

  classify(testObject) {
    return (
      this.classes
        .map(
          (classVector) =>
            testObject.multiplyVectors(classVector).sumElements() +
            classVector[this.attributesCount]
        )
        .maxIndex() + 1
    );
  }
  *generateVectors(init) {
    for (let i = 0; i < this.classCount; i++) {
      if (init) yield [...this.generateZeroVector()];
      else yield [...this.generateRandomVector()];
    }
  }
  *generateZeroVector() {
    for (let j = 0; j < this.attributesCount + 1; j++) yield 0;
  }
  *estimate(j) {
    for (let i = 0; i < this.classCount; i++) {
      yield this.innerProduct(this.classes[i], this.trainigVectors[j]);
    }
  }
  *generateRandomVector() {
    for (let j = 0; j < this.attributesCount + 1; j++)
      yield this.randomAttributeFromInterval(-10, 10);
  }
  updateClasses(j) {
    return this.classes.map((classVector, i) => {
      if (i !== j) return classVector.subVectors(this.trainigVectors[j]);
      return classVector.sumVectors(this.trainigVectors[j]);
    });
  }
  randomAttributeFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  innerProduct(classVector, trainigVector) {
    return classVector.multiplyVectors(trainigVector).sumElements();
  }
  checkProduct(estimates, index) {
    for (let i = 0; i < estimates.length; i++) {
      if (i != index && estimates[i] >= estimates[index]) return false;
    }
    return true;
  }
  attribute(sign, value, x, index) {
    return `${sign}${value}${x}${index}`;
  }
  decisiveFunctions() {
    let result = [];
    console.log(this.classes);
    for (let i = 0; i < this.classCount; i++) {
      let middle = "";
      let computed = "";
      for (let j = 0; j < this.attributesCount; j++) {
        const value = this.classes[i][j];
        const index = j + 1;
        if (value !== 0 && value !== 1) {
          if (value === -1) {
            computed += this.attribute("-", "", "x", index);
          } else if (j !== 0 && value > 0)
            computed += this.attribute("+", value, "x", index);
          else computed += this.attribute("", value, "x", index);
        }
        if (j !== 0 && value >= 0)
          middle += this.attribute("+", value, "x", index);
        else middle += this.attribute("", value, "x", index);
      }
      const last = this.classes[i][this.attributesCount];
      if (last != 0) computed += last > 0 ? `+${last}` : `${last}`;
      middle += last >= 0 ? `+${last}` : `${last}`;
      result.push(`d${i + 1}(x)=${middle}=${computed}`);
    }
    return result;
  }
}
