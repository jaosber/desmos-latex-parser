
console.log("\n===== LEXER TEST =====");

// \frac{a+b}{\cos\left(c\right)}+\sqrt{x^2+y^2}-e^{\left(-x^2\right)}\left(x\cdot y\cdot z\right)=9.567
// x^2+y^2=z^2+\frac{1}{2+3}\cos\left(x\right)
// \\frac{a+b}{\\cos\\left(x\\right)}+\\sqrt{x^2+y^2}=9.567
// x^2+y^2=z^2+\\frac{1}{2.7182+3}\\cos\\left(x-\\pi\\right)
//\\pi\\cdot\\cos\\left(x\\right)+a^{b}

let sampleLatex = "\\pi^{\\operatorname{mod}\\left(x,2\\right)}+a^{b^{c}}+\\sqrt{\\frac{1}{2.7182+y}}\\left(-1\\right)\\cdot\cos\\left(x+y\\right)";

let lexer = require("../parser/latex-lexer.min.js");
var state = lexer.lex(sampleLatex);

console.log("\nlatex string: "+sampleLatex+"\n");

while (!lexer.isDone(state)) {
  var tok = lexer.peek(state);
  console.log(tok.type.padEnd(15), JSON.stringify(tok.val));
  state = lexer.advance(state);
}


// HELPER: print tree without span noise

function cleanTree(node) {
  if (!node || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map(cleanTree);

  var out = { type: node.type };

  if (node.val !== undefined) out.val = node.val;
  if (node.nprimes !== undefined) out.nprimes = node.nprimes;
  if (node.args) out.args = node.args.map(cleanTree);
  if (node.num) out.num = cleanTree(node.num);
  if (node.den) out.den = cleanTree(node.den);
  if (node.sup) out.sup = cleanTree(node.sup);
  if (node.sub) out.sub = cleanTree(node.sub);
  if (node.arg) out.arg = cleanTree(node.arg);
  if (node.optArg) out.optArg = cleanTree(node.optArg);
  if (node.left) out.left = cleanTree(node.left);
  if (node.right) out.right = cleanTree(node.right);

  return out;
}

console.log("\n===== LATEX PARSER TEST =====");

/*
var tests = [
  "\\frac{3+1}{2}",
  "\\sqrt{x}",
  "\\sqrt[3]{x}",
  "x^{2}+y^{2}=1",
  "\\cos(x)",
  "\\left(x+1\\right)",
  "a_{n}",
  "2x+3",
  "\\frac{\\sin(x)}{x}",
]; */

let latexParser = require("../parser/latex-parser.min.js");
let tests = [sampleLatex,];

tests.forEach(function(input){
  console.log("\nInput:", input);
  try {
    var tree = latexParser.parse(input);
    console.log("Tree:", JSON.stringify(cleanTree(tree), null, 2));
  } catch(e) {
    console.log("Error:", e);
  }
});

console.log("\n===== EXPRESSION PARSER TEST =====");

let expressionParser = require("../parser/expression-parser.min.js");
let latexTree = latexParser.parse(sampleLatex);
let surfaceTree = expressionParser.parse(latexTree);

//sampleLatex = "a^{b^c}";

// Helper clean surface nodes
function cleanSurface(node) {
  
  if (!node || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map(cleanSurface);

  var out = { type: node.type };

  if (node.val !== undefined) out.val = node.val;
  if (node.symbol !== undefined) out.symbol = node.symbol;
  if (node.nprimes !== undefined) out.nprimes = node.nprimes;
  if (node.whole !== undefined) out.whole = node.whole;
  if (node.num !== undefined) out.num = node.num;
  if (node.den !== undefined) out.den = node.den;
  if (node.args) out.args = node.args.map(cleanSurface);
  if (node.first) out.first = cleanSurface(node.first);
  if (node.chain) out.chain = node.chain.map(cleanSurface);

  return out;
}

function testExpr(latex, latexParser, expressionParser) {
  console.log("\nInput:", latex, "\n");

  try {
    var latexTree = latexParser.parse(latex);
    var surfaceTree = expressionParser.parse(latexTree);
    console.log(JSON.stringify(cleanSurface(surfaceTree), null, 2));
  } catch(e) {
    console.log("Error:", e);
  }
}

testExpr(sampleLatex, latexParser, expressionParser);