const n = prompt("Input class count", 3);
const attributesCount = prompt("Attributes count", 2);

const perceptron = new Perceptron(Number(n), Number(attributesCount));
perceptron.train();
const ul = document.getElementById("decisiveFunctions");
const dF = perceptron.decisiveFunctions();
dF.forEach((fnc) => {
  let li = document.createElement("li");
  li.innerHTML = fnc;
  ul.appendChild(li);
});
document.getElementById("btn").addEventListener("click", () => {
  const object = prompt("Input object", "").split(" ").map(Number);
  console.log(object);
  const result = perceptron.classify(object);
  const h2 = document.getElementById("classificationResult");
  h2.textContent = `Object [${object}] belongs to class ${result}`;
});
