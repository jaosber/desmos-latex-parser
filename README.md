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
- [x] Phase 3 — Expression Parser
- [ ] Phase 4 — Lower
- [ ] Evaluation (`getEvalStrings` + `BuiltIn`)

## Test

```bash
node ./tests/test.js
node ./tests/surface-eval.js
```

Ouput

```javascript

===== LEXER TEST =====

latex string: \pi^{\operatorname{mod}\left(x,2\right)}+a^{b^{c}}+\sqrt{\frac{1}{2.7182+y}}\left(-1\right)\cdotcos\left(x+y\right)

Cmd             "\\pi"
^               "^"
{               "{"
OperatorName    "\\operatorname"
{               "{"
Letter          "m"
Letter          "o"
Letter          "d"
}               "}"
Left            "\\left"
Symbol          "("
Letter          "x"
Symbol          ","
Digit           "2"
Right           "\\right"
Symbol          ")"
}               "}"
Symbol          "+"
Letter          "a"
^               "^"
{               "{"
Letter          "b"
^               "^"
{               "{"
Letter          "c"
}               "}"
}               "}"
Symbol          "+"
Sqrt            "\\sqrt"
{               "{"
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
Letter          "y"
}               "}"
}               "}"
Left            "\\left"
Symbol          "("
Symbol          "-"
Digit           "1"
Right           "\\right"
Symbol          ")"
Cmd             "\\cdotcos"
Left            "\\left"
Symbol          "("
Letter          "x"
Symbol          "+"
Letter          "y"
Right           "\\right"
Symbol          ")"

===== LATEX PARSER TEST =====

Input: \pi^{\operatorname{mod}\left(x,2\right)}+a^{b^{c}}+\sqrt{\frac{1}{2.7182+y}}\left(-1\right)\cdotcos\left(x+y\right)
Tree: {
  "type": "Group",
  "args": [
    {
      "type": "Cmd",
      "val": "\\pi"
    },
    {
      "type": "SupSub",
      "nprimes": 0,
      "sup": {
        "type": "Group",
        "args": [
          {
            "type": "OperatorName",
            "arg": {
              "type": "Group",
              "args": [
                {
                  "type": "Letter",
                  "val": "m"
                },
                {
                  "type": "Letter",
                  "val": "o"
                },
                {
                  "type": "Letter",
                  "val": "d"
                }
              ]
            }
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
                  "val": ","
                },
                {
                  "type": "Digit",
                  "val": "2"
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
    },
    {
      "type": "Symbol",
      "val": "+"
    },
    {
      "type": "Letter",
      "val": "a"
    },
    {
      "type": "SupSub",
      "nprimes": 0,
      "sup": {
        "type": "Group",
        "args": [
          {
            "type": "Letter",
            "val": "b"
          },
          {
            "type": "SupSub",
            "nprimes": 0,
            "sup": {
              "type": "Group",
              "args": [
                {
                  "type": "Letter",
                  "val": "c"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "Symbol",
      "val": "+"
    },
    {
      "type": "Sqrt",
      "arg": {
        "type": "Group",
        "args": [
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
                  "type": "Letter",
                  "val": "y"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "LeftRight",
      "arg": {
        "type": "Group",
        "args": [
          {
            "type": "Symbol",
            "val": "-"
          },
          {
            "type": "Digit",
            "val": "1"
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
    },
    {
      "type": "Cmd",
      "val": "\\cdotcos"
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
            "val": "+"
          },
          {
            "type": "Letter",
            "val": "y"
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

===== EXPRESSION PARSER TEST =====

Input: \pi^{\operatorname{mod}\left(x,2\right)}+a^{b^{c}}+\sqrt{\frac{1}{2.7182+y}}\left(-1\right)\cdotcos\left(x+y\right)

{
  "type": "Add",
  "args": [
    {
      "type": "Add",
      "args": [
        {
          "type": "Superscript",
          "args": [
            {
              "type": "Cmd",
              "val": "pi"
            },
            {
              "type": "Call",
              "args": [
                {
                  "type": "Cmd",
                  "val": "mod"
                },
                {
                  "type": "Seq",
                  "args": [
                    {
                      "type": "Letter",
                      "val": "x"
                    },
                    {
                      "type": "Decimal",
                      "val": "2"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Superscript",
          "args": [
            {
              "type": "Letter",
              "val": "a"
            },
            {
              "type": "Superscript",
              "args": [
                {
                  "type": "Letter",
                  "val": "b"
                },
                {
                  "type": "Letter",
                  "val": "c"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "Juxt",
      "args": [
        {
          "type": "Juxt",
          "args": [
            {
              "type": "Sqrt",
              "args": [
                {
                  "type": "Frac",
                  "args": [
                    {
                      "type": "Decimal",
                      "val": "1"
                    },
                    {
                      "type": "Add",
                      "args": [
                        {
                          "type": "Decimal",
                          "val": "2.7182"
                        },
                        {
                          "type": "Letter",
                          "val": "y"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "Paren",
              "args": [
                {
                  "type": "Neg",
                  "args": [
                    {
                      "type": "Decimal",
                      "val": "1"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Call",
          "args": [
            {
              "type": "Cmd",
              "val": "cdotcos"
            },
            {
              "type": "Add",
              "args": [
                {
                  "type": "Letter",
                  "val": "x"
                },
                {
                  "type": "Letter",
                  "val": "y"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

```
