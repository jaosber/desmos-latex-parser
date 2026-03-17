# desmos-latex-parser

Extraction and isolation of the LaTeX math parser from Desmos Graphing Calculator (2018 production build).

## Context

`src/calculator.js` is a single ~43,500-line JavaScript file that contains the entire Desmos graphing calculator as it was shipped to production. The codebase was originally written in **TypeScript**, compiled to **ES5**, bundled using **AMD** (RequireJS/Almond), and minified into one file.

The calculator runs all its math processing inside a **Web Worker**  a separate thread that doesn't block the UI. The entire worker code is embedded as a giant string literal (~35,000 lines) inside the main file. When the calculator starts, it injects this string into a `new Worker()`.

Inside that worker lives a complete LaTeX math parser, evaluator, and plotter. The goal of this project is to **extract the parser** out of the worker, isolate it from the rest of the system, and make it run standalone.

## Parser pipeline

The parser converts LaTeX math strings into evaluable expressions through 4 phases:

| Phase                 | Module              | Input                      | Output                                                                     |
| --------------------- | ------------------- | -------------------------- | -------------------------------------------------------------------------- |
| 1 - Latex Lexer       | `latex-lexer`       | Raw string `\frac{3+1}{2}` | Tokens: `Frac`, `{`, `Digit(3)`, `Symbol(+)`, ...                          |
| 2 - Latex Parser      | `latex-parser`      | Token stream               | LaTeX tree: `Frac { num: Group[...], den: Group[...] }`                    |
| 3 - Expression Parser | `expression-parser` | LaTeX tree                 | Math surface nodes with operator precedence                                |
| 4 - Lower             | `lower`             | Surface nodes              | Final parsenodes: `Divide([Add([Constant(3), Constant(1)]), Constant(2)])` |

Phases 1-2 understand LaTeX **structure** (fractions, roots, superscripts). Phases 3-4 understand **math semantics** (precedence, function calls, implicit multiplication).

After phase 4, the parsenodes are compiled to JavaScript via `getEvalStrings()` → `new Function()` and executed against a `BuiltIn` object that provides `cos`, `sin`, `pow`, etc.

## Status

- [x] Phase 1 — Latex Lexer (extracted, functional)
- [x] Phase 2 — Latex Parser (extracted, functional)
- [ ] Phase 3 — Expression Parser
- [ ] Phase 4 — Lower
- [ ] Evaluation (`getEvalStrings` + `BuiltIn`)

## Test

```bash
node ./tests/test.js
```

Ouput

```javascript
===== LEXER TEST =====

latex string: x^2+y^2=z^2+\frac{1}{2.7182+3}\cos\left(x-\pi\right)

Letter          "x"
^               "^"
Digit           "2"
Symbol          "+"
Letter          "y"
^               "^"
Digit           "2"
Symbol          "="
Letter          "z"
^               "^"
Digit           "2"
Symbol          "+"
Frac            "\\frac"
{               "{"
Digit           "1"
}               "}"
{               "{"
Digit           "2"
Symbol          "."
Digit           "7"
Digit           "1"
Digit           "8"
Digit           "2"
Symbol          "+"
Digit           "3"
}               "}"
Cmd             "\\cos"
Left            "\\left"
Symbol          "("
Letter          "x"
Symbol          "-"
Cmd             "\\pi"
Right           "\\right"
Symbol          ")"

===== LATEX PARSER TEST =====

Input: x^2+y^2=z^2+\frac{1}{2.7182+3}\cos\left(x-\pi\right)
Tree: {
  "type": "Group",
  "args": [
    {
      "type": "Letter",
      "val": "x"
    },
    {
      "type": "SupSub",
      "nprimes": 0,
      "sup": {
        "type": "Group",
        "args": [
          {
            "type": "Digit",
            "val": "2"
          }
        ]
      }
    },
    {
      "type": "Symbol",
      "val": "+"
    },
    {
      "type": "Letter",
      "val": "y"
    },
    {
      "type": "SupSub",
      "nprimes": 0,
      "sup": {
        "type": "Group",
        "args": [
          {
            "type": "Digit",
            "val": "2"
          }
        ]
      }
    },
    {
      "type": "Symbol",
      "val": "="
    },
    {
      "type": "Letter",
      "val": "z"
    },
    {
      "type": "SupSub",
      "nprimes": 0,
      "sup": {
        "type": "Group",
        "args": [
          {
            "type": "Digit",
            "val": "2"
          }
        ]
      }
    },
    {
      "type": "Symbol",
      "val": "+"
    },
    {
      "type": "Frac",
      "num": {
        "type": "Group",
        "args": [
          {
            "type": "Digit",
            "val": "1"
          }
        ]
      },
      "den": {
        "type": "Group",
        "args": [
          {
            "type": "Digit",
            "val": "2"
          },
          {
            "type": "Symbol",
            "val": "."
          },
          {
            "type": "Digit",
            "val": "7"
          },
          {
            "type": "Digit",
            "val": "1"
          },
          {
            "type": "Digit",
            "val": "8"
          },
          {
            "type": "Digit",
            "val": "2"
          },
          {
            "type": "Symbol",
            "val": "+"
          },
          {
            "type": "Digit",
            "val": "3"
          }
        ]
      }
    },
    {
      "type": "Cmd",
      "val": "\\cos"
    },
    {
      "type": "LeftRight",
      "arg": {
        "type": "Group",
        "args": [
          {
            "type": "Letter",
            "val": "x"
          },
          {
            "type": "Symbol",
            "val": "-"
          },
          {
            "type": "Cmd",
            "val": "\\pi"
          }
        ]
      },
      "left": {
        "type": "Symbol",
        "val": "("
      },
      "right": {
        "type": "Symbol",
        "val": ")"
      }
    }
  ]
}
```
