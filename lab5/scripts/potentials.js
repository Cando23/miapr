const mathjs = math.create(math.all, {});
const trainingVectors = [
  [-1, 0],
  [1, 1],
  [2, 0],
  [1, -2],
];
const potentialFunction = mathjs.parse(
  "1 + 4*x1*xi1 + 4*x2*xi2 + 16*x1*x2*xi1*xi2"
);

function transform(node) {
  if (node.isSymbolNode) {
    switch (node.name) {
      case "xi1":
        return new mathjs.ConstantNode(vector[0]);
      case "xi2":
        return new mathjs.ConstantNode(vector[1]);
      default:
        return node;
    }
  } else {
    return node;
  }
}
let sign = 1;
let fnc = 0;
let vector;
let node;
let coefficient;
for (let i = 0; i < 3; i++) {
  vector = trainingVectors[i];
  node = mathjs.simplify(potentialFunction.transform(transform));
  switch (sign) {
    case -1:
      fnc = mathjs.simplify(mathjs.parse(`${fnc}-(${node})`));
      break;
    case 1:
      fnc = mathjs.simplify(mathjs.parse(`${fnc}+${node}`));
      break;
  }
  coefficient = fnc.evaluate({
    x1: trainingVectors[i + 1][0],
    x2: trainingVectors[i + 1][1],
  });
  sign = i < 1 ? (coefficient <= 0 ? 1 : 0) : coefficient > 0 ? -1 : 0;
  console.log(coefficient, sign);
}

//again silver, waiting for explanation

// k = fnc.evaluate({ x1: trainingVectors[0][0], x2: trainingVectors[0][1] });
// if (k <= 0) {
//   vector = trainingVectors[1];
//   node = mathjs.simplify(potentialFunction.transform(transform));
//   fnc = mathjs.simplify(mathjs.parse(`${fnc}+${node}`));
// }

let separationFunction = mathjs.simplify(
  nerdamer.solveEquations(fnc.toString(), "x2").toString()
);
let leftBranch = [...calculateBranchPoints(-0.21, 4, 0.1)];
let rightBranch = [...calculateBranchPoints(-4, -0.26, 0.1)];

function* calculateBranchPoints(start, end, step) {
  for (let i = start; i < end; i += step)
    yield { x: i, y: separationFunction.evaluate({ x1: i }) };
}
