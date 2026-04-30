// Surface Tree Evaluator
// Walks the surface tree from expression-parser and computes results

// Samples functions
function mod(x, y) { return x - y*Math.floor(x/y); }
function step(x, a) { return (x < a) ? 0.0 : 1.0; }
function lerp(x, a, b) { return a + (b-a)*x; }
function clamp(x, a, b) { if(x < a) return a; if(x > b) return b; return x; }
function saturate(x) { return clamp(x, 0.0, 1.0); }
function smoothstep(x, a, b) { let y = saturate((x-a)/(b-a)); return 3.0*y*y - 2.0*y*y*y; }
function smootherstep(x, a, b) { let y = saturate((x - a) / (b - a)); return y * y * y * (y * (y * 6.0 - 15.0) + 10.0); }
function fract(x) { return x - Math.floor(x); }
function sigmoid(x){ return 1/(1+Math.exp(-x)); }
function eml(x, y) { return Math.exp(x)-Math.log(y); }
function min(x, y) { return (x < y) ? x : y; }
function max(x, y) { return (x > y) ? x : y; }
function pulse(x, a, b) { return step(a,x) - step(b,x); }
function trunc(x) { return Math.trunc(x); }
function atan2(y, x) { return Math.atan2(y,x); }
function wrap(x, a, b) { const range = b - a; return x - range * Math.floor((x - a) / range); }
function map(x, a, b, c, d) {
    let t = (x - a) / (b - a);
    let y = c + (d-c)*t;
    return y;
    //if (!clamped) return y;
    //return (c < d) ? clamp(y, c, d) : clamp(y, d, c);
}
function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  n = Math.round(n);
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

const latexParser      = require("../parser/latex-parser.min.js");
const expressionParser = require("../parser/expression-parser.min.js");

// ===== BUILT-IN MATH FUNCTIONS =====
const builtinFunctions = {
  "\\cos": Math.cos,
  "\\sin": Math.sin,
  "\\tan": Math.tan,
  "\\cot": (x) => 1/Math.tan(x),
  "\\sec": (x) => 1/Math.cos(x),
  "\\csc": (x) => 1/Math.sin(x),
  "\\arcsin": Math.asin,
  "\\arccos": Math.acos,
  "\\arctan": Math.atan,
  "\\sinh": Math.sinh,
  "\\cosh": Math.cosh,
  "\\tanh": Math.tanh,
  "\\ln": Math.log,
  "\\log": Math.log10,
  "\\exp": Math.exp,
  "\\abs": Math.abs,
  "\\sqrt": Math.sqrt,
  "\\floor": Math.floor,
  "\\ceil": Math.ceil,
  "\\round": Math.round,
  "\\sign": Math.sign,
  "mod": mod,
  "atan2": atan2,
  "step": step,
  "smoothstep": smoothstep,
  "fract": fract,
  "saturate": saturate,
  "lerp": lerp,
};

// ===== BUILT-IN CONSTANTS =====
const builtinConstants = {
  "pi": Math.PI,
  "tau": 2*Math.PI,
  "e": Math.E,
};

// ===== PARSE CONTEXT STRING =====
// Parses "a = 5" or "f(x) = cos(x)" into context entries
function parseContextEntry(entry) {
  entry = entry.trim();

  // Function definition: f(x) = expr  or  f(x,y) = expr
  var fnMatch = entry.match(/^([a-zA-Z_]\w*)\(([^)]+)\)\s*=\s*(.+)$/);
  if (fnMatch) {
    var name = fnMatch[1];
    var params = fnMatch[2].split(",").map((p) => p.trim());
    var bodyLatex = fnMatch[3];
    return {
      type: "function",
      name: name,
      params: params,
      bodyLatex: bodyLatex,
    };
  }

  // Variable assignment: a = 5  or  a = pi
  var varMatch = entry.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
  if (varMatch) {
    var name = varMatch[1];
    var valueStr = varMatch[2].trim();

    // Try as number first
    var num = parseFloat(valueStr);
    if (!isNaN(num)) {
      return { type: "variable", name: name, value: num };
    }

    // Try as known constant
    if (valueStr === "pi" || valueStr === "\\pi")
      return { type: "variable", name: name, value: Math.PI };
    if (valueStr === "tau" || valueStr === "\\tau")
      return { type: "variable", name: name, value: Math.PI * 2 };
    if (valueStr === "e") return { type: "variable", name: name, value: Math.E };

    // Try as LaTeX expression
    return { type: "variable", name: name, valueLatex: valueStr };
  }

  throw new Error("Cannot parse context entry: " + entry);
}

// ===== BUILD EVALUATION CONTEXT =====
function buildContext(entries) {
  var ctx = {
    vars: Object.assign({}, builtinConstants),
    fns: Object.assign({}, builtinFunctions),
  };

  if (!entries) return ctx;

  // Accept string array or single string with semicolons
  if (typeof entries === "string") entries = entries.split(";");

  for (var k = 0; k < entries.length; k++) {
    var parsed = parseContextEntry(entries[k]);

    if (parsed.type === "variable") {
      if (parsed.valueLatex) {
        // Evaluate the value expression with current context
        ctx.vars[parsed.name] = evaluate(parsed.valueLatex, ctx);
      } else {
        ctx.vars[parsed.name] = parsed.value;
      }
    }

    if (parsed.type === "function") {
      // Capture for closure
      (function (name, params, bodyLatex) {
        ctx.fns[name] = function () {
          // Create local context with parameters bound
          var localCtx = {
            vars: Object.assign({}, ctx.vars),
            fns: Object.assign({}, ctx.fns),
          };
          for (var i = 0; i < params.length; i++) {
            localCtx.vars[params[i]] = arguments[i];
          }
          return evaluate(bodyLatex, localCtx);
        };
      })(parsed.name, parsed.params, parsed.bodyLatex);
    }
  }

  return ctx;
}

// ===== CORE EVALUATOR =====
function evalNode(node, ctx) {
  switch (node.type) {
    // --- Literals ---
    case "Decimal":
      return parseFloat(node.val);

    case "MixedNumber":
      return parseFloat(node.whole) + parseFloat(node.num) / parseFloat(node.den);

    // --- Variables and commands ---
    case "Letter":
      if (ctx.vars.hasOwnProperty(node.val)) return ctx.vars[node.val];
      throw new Error("Undefined variable: " + node.val);

    case "Cmd":
      if (ctx.vars.hasOwnProperty(node.val)) return ctx.vars[node.val];
      throw new Error("Undefined symbol: " + node.val);

    // --- Arithmetic ---
    case "Add":
      return evalNode(node.args[0], ctx) + evalNode(node.args[1], ctx);

    case "Sub":
      return evalNode(node.args[0], ctx) - evalNode(node.args[1], ctx);

    case "Mul":
      return evalNode(node.args[0], ctx) * evalNode(node.args[1], ctx);

    case "Div":
      return evalNode(node.args[0], ctx) / evalNode(node.args[1], ctx);

    case "Frac":
      return evalNode(node.args[0], ctx) / evalNode(node.args[1], ctx);

    case "Neg":
      return -evalNode(node.args[0], ctx);

    case "Pos":
      return evalNode(node.args[0], ctx);

    // --- Exponents ---
    case "Superscript":
      return Math.pow(evalNode(node.args[0], ctx), evalNode(node.args[1], ctx));

    // --- Factorial ---
    case "Bang":
      return factorial(evalNode(node.args[0], ctx));

    // --- Implicit multiplication: 2x, 3pi ---
    case "Juxt":
      return evalNode(node.args[0], ctx) * evalNode(node.args[1], ctx);

    // --- Sqrt ---
    case "Sqrt":
      return Math.sqrt(evalNode(node.args[0], ctx));

    case "Nthroot":
      return Math.pow(
        evalNode(node.args[1], ctx),
        1 / evalNode(node.args[0], ctx),
      );

    // --- Absolute value (pipes) ---
    case "Pipes":
      return Math.abs(evalNode(node.args[0], ctx));

    // --- Function calls: \cos(x), f(x), f(x,y) ---
    case "Call":
      return evalCall(node, ctx);

    case "ImplicitCall":
      return evalCall(node, ctx);

    // --- Parentheses ---
    case "Paren":
      return evalNode(node.args[0], ctx);

    // --- Sequences (for multi-arg functions) ---
    case "Seq":
      return node.args.map(function (a) {
        return evalNode(a, ctx);
      });

    // --- Subscript: a_1, x_n (treat as variable lookup) ---
    case "Subscript":
      var baseName = node.args[0].val || "";
      var subName = node.args[1].val || "";
      var fullName = baseName + "_" + subName;
      if (ctx.vars.hasOwnProperty(fullName)) return ctx.vars[fullName];
      throw new Error("Undefined subscripted variable: " + fullName);

    // --- Comparisons (return boolean as 1/0) ---
    case "Equals":
      return evalNode(node.args[0], ctx) === evalNode(node.args[1], ctx)
        ? 1
        : 0;

    case "Inequality":
      return evalInequality(node, ctx);

    // --- Ellipsis (range) ---
    case "Ellipsis":
      return evalRange(node, ctx);

    // --- List ---
    case "List":
      var items = node.args[0];
      if (items.type === "Seq")
        return items.args.map(function (a) {
          return evalNode(a, ctx);
        });
      return [evalNode(items, ctx)];

    // --- Percent ---
    case "PercentOf":
      return (evalNode(node.args[0], ctx) / 100) * evalNode(node.args[1], ctx);

    // --- Colon (piecewise condition:value) ---
    case "Colon":
      var condition = evalNode(node.args[0], ctx);
      if (condition) return evalNode(node.args[1], ctx);
      return NaN;

    // --- Piecewise ---
    case "Piecewise":
      return evalPiecewise(node, ctx);

    case "EmptyPiecewise":
      return NaN;

    default:
      throw new Error("Unknown node type: " + node.type);
  }
}

// ===== FUNCTION CALL EVALUATION =====
function evalCall(node, ctx) {
  var caller = node.args[0];
  var argNode = node.args[1];

  // Get function name
  var fnName;
  if (caller.type === "Cmd") fnName = caller.val;
  else if (caller.type === "Letter") fnName = caller.val;
  else if (caller.type === "Subscript") {
    fnName = (caller.args[0].val || "") + "_" + (caller.args[1].val || "");
  } else if (caller.type === "Superscript") {
    // sin^2(x) → sin(x)^2
    var baseFn = caller.args[0].val || caller.args[0].val;
    var exponent = evalNode(caller.args[1], ctx);

    // Handle inverse: sin^{-1}(x) = arcsin(x)
    if (exponent === -1) {
      var inverseName = "\\arc" + baseFn.replace("\\", "");
      if (ctx.fns[inverseName]) {
        var innerArgs = evalArgs(argNode, ctx);
        return ctx.fns[inverseName].apply(null, innerArgs);
      }
    }

    var innerArgs = evalArgs(argNode, ctx);
    var fn = ctx.fns[baseFn];
    if (fn) return Math.pow(fn.apply(null, innerArgs), exponent);
    throw new Error("Unknown function: " + baseFn);
  } else {
    throw new Error("Cannot call: " + JSON.stringify(caller.type));
  }

  // Evaluate arguments
  var args = evalArgs(argNode, ctx);

  // Look up function
  var fn = ctx.fns[fnName] || ctx.fns["\\" + fnName];
  if (fn) return fn.apply(null, args);

  // Maybe it's multiplication: a(b) where a is a variable
  if (ctx.vars.hasOwnProperty(fnName) && args.length === 1) {
    return ctx.vars[fnName] * args[0];
  }

  throw new Error("Unknown function: " + fnName);
}

function evalArgs(argNode, ctx) {
  if (argNode.type === "Seq")
    return argNode.args.map(function (a) {
      return evalNode(a, ctx);
    });
  return [evalNode(argNode, ctx)];
}

// ===== INEQUALITY EVALUATION =====
function evalInequality(node, ctx) {
  var left = evalNode(node.args[0], ctx);
  var right = evalNode(node.args[1], ctx);
  switch (node.symbol) {
    case "<":   return left < right ? 1 : 0;
    case ">":   return left > right ? 1 : 0;
    case "<=":  return left <= right ? 1 : 0;
    case ">=":  return left >= right ? 1 : 0;
    default:    return 0;
  }
}

// ===== PIECEWISE EVALUATION =====
function evalPiecewise(node, ctx) {
  var inner = node.args[0];
  if (inner.type === "Seq") {
    for (var k = 0; k < inner.args.length; k++) {
      var piece = inner.args[k];
      if (piece.type === "Colon") {
        if (evalNode(piece.args[0], ctx)) return evalNode(piece.args[1], ctx);
      } else {
        return evalNode(piece, ctx);
      }
    }
    return NaN;
  }
  if (inner.type === "Colon") {
    if (evalNode(inner.args[0], ctx)) return evalNode(inner.args[1], ctx);
    return NaN;
  }
  return evalNode(inner, ctx);
}

// ===== RANGE EVALUATION =====
function evalRange(node, ctx) {
  var start = evalNode(node.args[0], ctx);
  var end = evalNode(node.args[1], ctx);
  var step = start < end ? 1 : -1;
  var result = [];
  for (var i = start; step > 0 ? i <= end : i >= end; i += step) {
    result.push(i);
  }
  return result;
}


// ===== MAIN EVALUATE FUNCTION =====
function evaluate(latex, ctxOrEntries) {
  var ctx;
  if (!ctxOrEntries) {
    ctx = buildContext();
  } else if (Array.isArray(ctxOrEntries) || typeof ctxOrEntries === "string") {
    ctx = buildContext(ctxOrEntries);
  } else {
    ctx = ctxOrEntries; // already a context object
  }

  var latexTree = latexParser.parse(latex);
  var surfaceTree = expressionParser.parse(latexTree);
  return evalNode(surfaceTree, ctx);
}

// ===== CONVENIENT WRAPPER =====
function calc(contextEntries, latex) {
  if (arguments.length === 1) {
    latex = contextEntries;
    contextEntries = null;
  }
  return evaluate(latex, contextEntries);
}

// ============================================================
// TESTS
// ============================================================
function test(description, contextEntries, latex, expected) {
  try {
    var result = calc(contextEntries, latex);
    var pass = typeof expected === "number"
      ? Math.abs(result - expected) < 1e-10
      : result === expected;
    var status = pass ? "PASS" : "FAIL";
    console.log(
      status + "  " + description.padEnd(45) +
      latex.padEnd(35) + " = " + result +
      (pass ? "" : "  (expected: " + expected + ")"),
    );
  } catch (e) {
    console.log("ERROR " + description.padEnd(45) + latex.padEnd(35) + " → " + e.message);
  }
}


console.log("===== BASIC ARITHMETIC =====\n");
test("Integer addition",        null, "3+2", 5);
test("Integer subtraction",     null, "10-7", 3);
test("Integer multiplication",  null, "3*4", 12);
test("Cdot multiplication",     null, "3\\cdot 4", 12);
test("Division",                null, "\\frac{10}{4}", 2.5);
test("Negative",                null, "-5+3", -2);
test("Nested fraction",         null, "\\frac{\\frac{1}{2}}{\\frac{1}{4}}", 2);
test("Mixed operations",        null, "2+3*4", 14);
test("Precedence",              null, "1+2*3+4", 11);
test("Parentheses",             null, "(2+3)*4", 20);

console.log("\n===== EXPONENTS =====\n");
test("Square",                  null, "2^{2}", 4);
test("Cube",                    null, "2^{3}", 8);
test("Fractional exponent",     null, "8^{\\frac{1}{3}}", 2);
test("Right associative",       null, "2^{3^{2}}", 512);


console.log("\n===== SPECIAL OPERATIONS =====\n");

test("Factorial",               null, "5!", 120);
test("Factorial zero",          null, "0!", 1);
test("Absolute value",          null, "\\left|-5\\right|", 5);
test("Square root",             null, "\\sqrt{16}", 4);
test("Cube root",               null, "\\sqrt[3]{27}", 3);
test("Implicit multiply",       ["x = pi"], "2x", 2 * Math.PI);
test("Module",                  null, "\\operatorname{mod}(3.5,2)", 1.5);


console.log("\n===== CONSTANTS =====\n");
test("Pi",                      null, "\\pi", Math.PI);
test("Euler",                   null, "e", Math.E);
test("Tau",                     null, "\\tau", Math.PI * 2);

console.log("\n===== TRIG FUNCTIONS =====\n");
test("cos(0)",                  null, "\\cos(0)", 1);
test("sin(0)",                  null, "\\sin(0)", 0);
test("sin(pi/2)",               null, "\\sin(\\frac{\\pi}{2})", 1);
test("tan(0)",                  null, "\\tan(0)", 0);
test("cos with \\left\\right",  null, "\\cos\\left(0\\right)", 1);


console.log("\n===== LOGARITHMS =====\n");
test("ln(1)",                   null, "\\ln(1)", 0);
test("ln(e)",                   null, "\\ln(e)", 1);
test("log(100)",                null, "\\log(100)", 2);
test("exp(0)",                  null, "\\exp(0)", 1);
test("exp(1)",                  null, "\\exp(1)", Math.E);

console.log("\n===== VARIABLES =====\n");
test("Simple variable",         ["a = 5"],              "a+1", 6);
test("Two variables",           ["a = 3", "b = 7"],     "a+b", 10);
test("Variable expression",     ["a = 3", "b = 7"],     "a*b+1", 22);
test("Pi variable",             ["r = 5"],              "\\pi*r^{2}", Math.PI * 25);
test("Variable chain",          ["a = 2", "b = a+3"],   "b", 5);
test("Subscripted variable",    ["x_1 = 10"],           "x_{1}+5", 15);

console.log("\n===== USER FUNCTIONS =====\n");
test("Simple function",         ["f(x) = x+1"],                        "f(3)", 4);
test("Quadratic function",      ["f(x) = x^{2}+1"],                    "f(4)", 17);
test("Trig function",           ["f(x) = \\cos(x)"],                   "f(0)", 1);
test("Composed",                ["f(x) = x^{2}", "g(x) = f(x)+1"],    "g(3)", 10);
test("Two params",              ["f(x,y) = x+y"],                      "f(3,4)", 7);
test("Three params",            ["f(x,y,z) = x*y+z"],                  "f(2,3,1)", 7);
test("Complex function",        ["f(x) = \\frac{\\cos(x)}{x+1}"],     "f(0)", 1);
test("Function with constant",  ["f(x) = \\sin(x)*\\pi"],              "f(0)", 0);

console.log("\n===== COMBINED =====\n");
test("Full expression",
  ["a = 5", "f(x) = \\cos(x)"],
  "f(a)+\\frac{1}{2}",
  Math.cos(5) + 0.5
);

test("Quadratic formula part",
  ["a = 1", "b = -3", "c = 2"],
  "\\frac{-b+\\sqrt{b^{2}-4*a*c}}{2*a}",
  2
);

test("Circle area",
  ["r = 3"],
  "\\pi*r^{2}",
  Math.PI * 9
);

test("Compound function",
  ["f(x) = x^{2}", "g(x) = \\sqrt{x}"],
  "g(f(3))+1",
  4
);

test("Physics: kinetic energy",
  ["m = 10", "v = 3"],
  "\\frac{1}{2}*m*v^{2}",
  45
);

test("Nested functions",
  ["f(x) = x+1", "g(x) = x*2"],
  "f(g(f(1)))",
  5
);

console.log("\n===== INEQUALITIES =====\n");
test("Less than true",          null, "3<5", 1);
test("Less than false",         null, "5<3", 0);
test("Greater equal",           null, "5\\ge 5", 1);
test("Equality",                null, "3=3", 1);
test("Equality false",          null, "3=4", 0);
