
console.log("\n===== LEXER TEST =====");

// \frac{a+b}{\cos\left(c\right)}+\sqrt{x^2+y^2}-e^{\left(-x^2\right)}\left(x\cdot y\cdot z\right)=9.567
// x^2+y^2=z^2+\frac{1}{2+3}\cos\left(x\right)
// \\frac{a+b}{\\cos\\left(x\\right)}+\\sqrt{x^2+y^2}=9.567

let sampleLatex = "x^2+y^2=z^2+\\frac{1}{2.7182+3}\\cos\\left(x-\\pi\\right)";

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

