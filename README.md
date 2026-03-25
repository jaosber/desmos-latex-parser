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

===== BASIC ARITHMETIC =====

PASS  Integer addition                             3+2                                 = 5
PASS  Integer subtraction                          10-7                                = 3
PASS  Integer multiplication                       3*4                                 = 12
PASS  Cdot multiplication                          3\cdot 4                            = 12
PASS  Division                                     \frac{10}{4}                        = 2.5
PASS  Negative                                     -5+3                                = -2
PASS  Nested fraction                              \frac{\frac{1}{2}}{\frac{1}{4}}     = 2
PASS  Mixed operations                             2+3*4                               = 14
PASS  Precedence                                   1+2*3+4                             = 11
PASS  Parentheses                                  (2+3)*4                             = 20

===== EXPONENTS =====

PASS  Square                                       2^{2}                               = 4
PASS  Cube                                         2^{3}                               = 8
PASS  Fractional exponent                          8^{\frac{1}{3}}                     = 2
PASS  Right associative                            2^{3^{2}}                           = 512

===== SPECIAL OPERATIONS =====

PASS  Factorial                                    5!                                  = 120
PASS  Factorial zero                               0!                                  = 1
PASS  Absolute value                               \left|-5\right|                     = 5
PASS  Square root                                  \sqrt{16}                           = 4
PASS  Cube root                                    \sqrt[3]{27}                        = 3
PASS  Implicit multiply                            2x                                  = 6.283185307179586
PASS  Module                                       \operatorname{mod}(3.5,2)           = 1.5

===== CONSTANTS =====

PASS  Pi                                           \pi                                 = 3.141592653589793
PASS  Euler                                        e                                   = 2.718281828459045
PASS  Tau                                          \tau                                = 6.283185307179586

===== TRIG FUNCTIONS =====

PASS  cos(0)                                       \cos(0)                             = 1
PASS  sin(0)                                       \sin(0)                             = 0
PASS  sin(pi/2)                                    \sin(\frac{\pi}{2})                 = 1
PASS  tan(0)                                       \tan(0)                             = 0
PASS  cos with \left\right                         \cos\left(0\right)                  = 1

===== LOGARITHMS =====

PASS  ln(1)                                        \ln(1)                              = 0
PASS  ln(e)                                        \ln(e)                              = 1
PASS  log(100)                                     \log(100)                           = 2
PASS  exp(0)                                       \exp(0)                             = 1
PASS  exp(1)                                       \exp(1)                             = 2.718281828459045

===== VARIABLES =====

PASS  Simple variable                              a+1                                 = 6
PASS  Two variables                                a+b                                 = 10
PASS  Variable expression                          a*b+1                               = 22
PASS  Pi variable                                  \pi*r^{2}                           = 78.53981633974483
PASS  Variable chain                               b                                   = 5
PASS  Subscripted variable                         x_{1}+5                             = 15

===== USER FUNCTIONS =====

PASS  Simple function                              f(3)                                = 4
PASS  Quadratic function                           f(4)                                = 17
PASS  Trig function                                f(0)                                = 1
PASS  Composed                                     g(3)                                = 10
PASS  Two params                                   f(3,4)                              = 7
PASS  Three params                                 f(2,3,1)                            = 7
PASS  Complex function                             f(0)                                = 1
PASS  Function with constant                       f(0)                                = 0

===== COMBINED =====

PASS  Full expression                              f(a)+\frac{1}{2}                    = 0.7836621854632262
PASS  Quadratic formula part                       \frac{-b+\sqrt{b^{2}-4*a*c}}{2*a}   = 2
PASS  Circle area                                  \pi*r^{2}                           = 28.274333882308138
PASS  Compound function                            g(f(3))+1                           = 4
PASS  Physics: kinetic energy                      \frac{1}{2}*m*v^{2}                 = 45
PASS  Nested functions                             f(g(f(1)))                          = 5

===== INEQUALITIES =====

PASS  Less than true                               3<5                                 = 1
PASS  Less than false                              5<3                                 = 0
PASS  Greater equal                                5\ge 5                              = 1
PASS  Equality                                     3=3                                 = 1
PASS  Equality false                               3=4                                 = 0

```
