
// Desmos LaTeX Parser - Standalone (extracted from calculator.js)
// Phases: char-codes → input-span → latex-lexer → latex-node → latex-parser

// MODULE 1: char-codes
const charCodes = {
  isDigit(e) { return 48 <= e && e <= 57; },
  isLowerCaseLetter(e) { return 97 <= e && e <= 122; },
  isUpperCaseLetter(e) { return 65 <= e && e <= 90; },
  isLetter(e) { return charCodes.isLowerCaseLetter(e) || charCodes.isUpperCaseLetter(e); },
  isBackslash(e) { return 92 === e; },
  isDot(e) { return 46 === e; },
  isSingleQuote(e) { return 39 === e; },
  isWhitespace(e) {
    if (9 <= e && e <= 13) return true;
    if (8192 <= e && e <= 8202) return true;
    switch (e) {
      case 32: case 160: case 5760: case 8232:
      case 8233: case 8239: case 8287: case 12288:
      case 65279: return true;
      default: return false;
    }
  }
};

// MODULE 2: input-span 
const inputSpan = {
  Span(input, start, end) {
    return { input, start, end };
  },
  emptySpanAt(input, pos) {
    return { input, start: pos, end: pos };
  },
  joinSpans(a, b) {
    if (a.input !== b.input)
      throw new Error("Programming Error: cannot form a span on different inputs");
    return { input: a.input, start: a.start, end: b.end };
  },
  slice(span) {
    return span.input.slice(span.start, span.end);
  }
};

// MODULE 3: latex-node 
const latexNode = {
  Group(span, args)                { return { type: "Group", span, args }; },
  Sqrt(span, optArg, arg)          { return { type: "Sqrt", span, optArg, arg }; },
  Frac(span, num, den)             { return { type: "Frac", span, num, den }; },
  SupSub(span, sup, sub, nprimes)  { return { type: "SupSub", span, sup, sub, nprimes }; },
  LeftRight(span, left, right, arg){ return { type: "LeftRight", span, left, right, arg }; },
  OperatorName(span, arg)          { return { type: "OperatorName", span, arg }; },
  Symbol(span, val)                { return { type: "Symbol", span, val }; }
};

// MODULE 4: latex-lexer 
const specialCommands = {
  "\\left": "Left",
  "\\right": "Right",
  "\\sqrt": "Sqrt",
  "\\frac": "Frac",
  "\\operatorname": "OperatorName"
};

const specialSymbols = {
  "[": "[", "]": "]", "{": "{", "}": "}", "^": "^", "_": "_"
};

function makeToken(type, span, val) {
  return { type, span, val };
}

function makeState(input, prevSpan, pos, token) {
  return { input, prevSpan, pos, token };
}

function scanToken(input, pos) {
  var startPos = pos;

  if (pos >= input.length)
    return makeToken("End", inputSpan.emptySpanAt(input, pos), "");

  var code = input.charCodeAt(pos);

  // Digit
  if (charCodes.isDigit(code)) {
    var span = inputSpan.Span(input, startPos, pos + 1);
    return makeToken("Digit", span, input.charAt(startPos));
  }

  // Letter
  if (charCodes.isLetter(code)) {
    var span = inputSpan.Span(input, startPos, pos + 1);
    return makeToken("Letter", span, input.charAt(startPos));
  }

  // Backslash → command or escaped symbol
  if (charCodes.isBackslash(code)) {
    pos += 1;
    if (charCodes.isLetter(input.charCodeAt(pos))) {
      while (charCodes.isLetter(input.charCodeAt(pos))) pos += 1;
      var span = inputSpan.Span(input, startPos, pos);
      var text = inputSpan.slice(span);
      var type = specialCommands[text] || "Cmd";
      return makeToken(type, span, text);
    }
    pos += 1;
    var span = inputSpan.Span(input, startPos, pos);
    var text = inputSpan.slice(span);
    return makeToken("EscapedSymbol", span, text);
  }

  // Single quotes (primes)
  if (charCodes.isSingleQuote(code)) {
    pos += 1;
    while (charCodes.isSingleQuote(input.charCodeAt(pos))) pos += 1;
    if ("^" === input.charAt(pos)) {
      pos += 1;
      var span = inputSpan.Span(input, startPos, pos);
      var text = inputSpan.slice(span);
      return makeToken("Primes^", span, text);
    }
    var span = inputSpan.Span(input, startPos, pos);
    var text = inputSpan.slice(span);
    return makeToken("Primes", span, text);
  }

  // Everything else
  var span = inputSpan.Span(input, startPos, pos + 1);
  var ch = input.charAt(startPos);
  var type = specialSymbols[ch] || "Symbol";
  return makeToken(type, span, ch);
}

const lexer = {
  spanStates(startState, endState) {
    return inputSpan.joinSpans(startState.token.span, endState.prevSpan);
  },

  lex(input) {
    return lexer._lexFrom(input, 0, inputSpan.emptySpanAt(input, 0));
  },

  _lexFrom(input, pos, prevSpan) {
    while (charCodes.isWhitespace(input.charCodeAt(pos))) pos += 1;
    var token = scanToken(input, pos);
    return makeState(input, prevSpan, pos, token);
  },

  advance(state) {
    return lexer._lexFrom(state.input, state.token.span.end, state.token.span);
  },

  peek(state) {
    return state.token;
  },

  eat(state, expectedType) {
    if (state.token.type !== expectedType)
      throw "Parse Error: expected " + expectedType + ".";
    return lexer.advance(state);
  },

  isAt(state, type) {
    return state.token.type === type;
  },

  isDone(state) {
    return state.pos >= state.input.length;
  }
};

// MODULE 5: latex-parser 
function greediness(tokenType) {
  switch (tokenType) {
    case "Frac": return 2;
    case "^": case "_": case "Primes^":
    case "Left": case "Sqrt": case "OperatorName": return 1;
    default: return 0;
  }
}

function result(state, tree) {
  return { state, tree };
}

function parseGroup(state, insideBracket) {
  var startState = state;
  var items = [];

  loop:
  while (!lexer.isDone(state)) {
    var tok = lexer.peek(state);
    switch (tok.type) {
      case "Cmd": case "EscapedSymbol": case "Letter": case "Digit":
      case "Symbol": case "[": case "{": case "^": case "_":
      case "Primes": case "Primes^": case "Left": case "Frac":
      case "Sqrt": case "OperatorName": case "]":
        if ("]" === tok.type && insideBracket) break loop;
        var r = parseAtom(state);
        state = r.state;
        var node = r.tree;
        if ("Group" === node.type)
          for (var k = 0; k < node.args.length; k++) items.push(node.args[k]);
        else
          items.push(node);
        break;
      case "}": case "Right": case "End":
        break loop;
      default:
        throw "Unexpected token type " + tok.type + ".";
    }
  }

  var span = lexer.spanStates(startState, state);
  return result(state, latexNode.Group(span, items));
}

function parseAtom(state) {
  var tok = lexer.peek(state);
  switch (tok.type) {
    case "Cmd": case "EscapedSymbol": case "Letter":
    case "Digit": case "Symbol":
      state = lexer.advance(state);
      return result(state, tok);

    case "[": case "]":
      state = lexer.advance(state);
      return result(state, latexNode.Symbol(tok.span, tok.val));

    case "{":
      state = lexer.advance(state);
      var r = parseGroup(state, false);
      state = r.state;
      var tree = r.tree;
      state = lexer.eat(state, "}");
      return result(state, tree);

    case "^": case "_": case "Primes": case "Primes^":
      return parseSupSub(state);
    case "Left":
      return parseLeftRight(state);
    case "Frac":
      return parseFrac(state);
    case "Sqrt":
      return parseSqrt(state);
    case "OperatorName":
      return parseOperatorName(state);

    case "}": case "Right":
      throw "Parse Error: unexpected " + tok.val + ".";
    case "End":
      throw "Parse Error: unexpected end.";
    default:
      throw "Unexpected token type " + tok.type + ".";
  }
}

function parseOperatorName(state) {
  var startState = state;
  var cmdToken = lexer.peek(state);
  state = lexer.eat(state, "OperatorName");
  var r = parseGreedyArg(state, cmdToken);
  state = r.state;
  var arg = r.tree;
  var span = lexer.spanStates(startState, state);
  return result(state, latexNode.OperatorName(span, arg));
}

function parseSqrt(state) {
  var startState = state;
  var cmdToken = lexer.peek(state);
  state = lexer.eat(state, "Sqrt");

  var optArg;
  if (lexer.isAt(state, "[")) {
    var r = parseOptionalArg(state);
    state = r.state;
    optArg = r.tree;
  }

  var r2 = parseGreedyArg(state, cmdToken);
  state = r2.state;
  var body = r2.tree;
  var span = lexer.spanStates(startState, state);
  return result(state, latexNode.Sqrt(span, optArg, body));
}

function parseFrac(state) {
  var startState = state;
  var cmdToken = lexer.peek(state);
  state = lexer.eat(state, "Frac");

  var r1 = parseGreedyArg(state, cmdToken);
  state = r1.state;
  var num = r1.tree;

  var r2 = parseGreedyArg(state, cmdToken);
  state = r2.state;
  var den = r2.tree;

  var span = lexer.spanStates(startState, state);
  return result(state, latexNode.Frac(span, num, den));
}

function parseLeftRight(state) {
  var startState = state;
  state = lexer.eat(state, "Left");
  var leftDelim = lexer.peek(state);
  state = lexer.advance(state);

  var r = parseGroup(state, false);
  state = r.state;
  var body = r.tree;

  state = lexer.eat(state, "Right");
  var rightDelim = lexer.peek(state);
  state = lexer.advance(state);

  var span = lexer.spanStates(startState, state);
  return result(state, latexNode.LeftRight(span, leftDelim, rightDelim, body));
}

function parseSupSub(state) {
  var startState = state;
  var sup, sub, nprimes = 0;

  loop:
  while (!lexer.isDone(state)) {
    var tok = lexer.peek(state);
    switch (tok.type) {
      case "^":
        state = lexer.advance(state);
        if (sup) throw "Parse Error: double superscript.";
        var r = parseGreedyArg(state, tok);
        state = r.state; sup = r.tree;
        break;
      case "_":
        state = lexer.advance(state);
        if (sub) throw "Parse Error: double subscript.";
        var r = parseGreedyArg(state, tok);
        state = r.state; sub = r.tree;
        break;
      case "Primes":
        state = lexer.advance(state);
        if (nprimes > 0) throw "Parse Error: double primes.";
        nprimes = tok.val.length;
        break;
      case "Primes^":
        state = lexer.advance(state);
        if (nprimes > 0) throw "Parse Error: double primes.";
        if (sup) throw "Parse Error: double superscript";
        nprimes = tok.val.length - 1;
        var r = parseGreedyArg(state, tok);
        state = r.state; sup = r.tree;
        break;
      default:
        break loop;
    }
  }

  var span = lexer.spanStates(startState, state);
  return result(state, latexNode.SupSub(span, sup, sub, nprimes));
}

function parseGreedyArg(state, cmdToken) {
  var g = greediness(cmdToken.type);
  if (g <= 0)
    throw new Error("Programming Error: greediness must be greater than 0.");

  var nextG = greediness(lexer.peek(state).type);
  if (nextG > 0 && nextG <= g) {
    var cmdText = inputSpan.slice(cmdToken.span);
    var nextText = inputSpan.slice(lexer.peek(state).span);
    throw "Parse Error: can't use " + nextText + " as argument of " + cmdText + ". Use {}.";
  }

  var r = parseAtom(state);
  state = r.state;
  var tree = r.tree;
  if ("Group" !== tree.type) tree = latexNode.Group(tree.span, [tree]);
  return result(state, tree);
}

function parseOptionalArg(state) {
  state = lexer.eat(state, "[");
  var r = parseGroup(state, true);
  state = r.state;
  var tree = r.tree;
  state = lexer.eat(state, "]");
  return result(state, tree);
}

const latexParser = {
  parse(input) {
    var r = parseGroup(lexer.lex(input), false);
    var state = r.state;
    var tree = r.tree;
    if (!lexer.isDone(state))
      throw "Parse error: unexpected " + inputSpan.slice(lexer.peek(state).span) + ".";
    return tree;
  }
};


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

// ============================================================
// TESTS

console.log("===== LEXER TEST =====");

let sample = "1\\cdot2\\cdot3+\\frac{\\pi}{1+\\frac{2}{3+\\frac{4}{5+6}}}+\\sqrt{a^2+b^2}\\cdot\\exp\\left(x\\right)";
var state = lexer.lex(sample);
while (!lexer.isDone(state)) {
  var tok = lexer.peek(state);
  console.log(tok.type.padEnd(15), JSON.stringify(tok.val));
  state = lexer.advance(state);
}


console.log("\n===== PARSER TESTS =====");
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

var tests = [
    "1\\cdot2\\cdot3+\\frac{\\pi}{1+\\frac{2}{3+\\frac{4}{5+6}}}+\\sqrt{a^2+b^2}\\cdot\\exp\\left(x\\right)",
];

tests.forEach(function(input){
  console.log("\nInput:", input);
  try {
    var tree = latexParser.parse(input);
    console.log("Tree:", JSON.stringify(cleanTree(tree), null, 2));
  } catch(e) {
    console.log("Error:", e);
  }
});
