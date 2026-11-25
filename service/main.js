// src/service/main.ts
import { execFile } from "node:child_process";
import http from "node:http";
import os from "node:os";
import { promisify } from "node:util";

// src/core/skills.ts
import fs from "node:fs/promises";
import path2 from "node:path";
import { randomUUID } from "node:crypto";

// src/core/sources.ts
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

// node_modules/jsonc-parser/lib/esm/impl/scanner.js
function createScanner(text, ignoreTrivia = false) {
  const len = text.length;
  let pos = 0, value = "", tokenOffset = 0, token2 = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    let digits = 0;
    let value2 = 0;
    while (digits < count || !exact) {
      let ch = text.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token2 = 16;
    scanError = 0;
  }
  function scanNumber() {
    let start = pos;
    if (text.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text.length && text.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text.substring(start, pos);
      }
    }
    let end = pos;
    if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text.substring(start, end);
  }
  function scanString() {
    let result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2;
        break;
      }
      const ch = text.charCodeAt(pos);
      if (ch === 34) {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        const ch2 = text.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            const ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token2 = 17;
    }
    let code = text.charCodeAt(pos);
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token2 = 15;
    }
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && text.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token2 = 14;
    }
    switch (code) {
      // tokens: []{}:,
      case 123:
        pos++;
        return token2 = 1;
      case 125:
        pos++;
        return token2 = 2;
      case 91:
        pos++;
        return token2 = 3;
      case 93:
        pos++;
        return token2 = 4;
      case 58:
        pos++;
        return token2 = 6;
      case 44:
        pos++;
        return token2 = 5;
      // strings
      case 34:
        pos++;
        value = scanString();
        return token2 = 10;
      // comments
      case 47:
        const start = pos - 1;
        if (text.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text.substring(start, pos);
          return token2 = 12;
        }
        if (text.charCodeAt(pos + 1) === 42) {
          pos += 2;
          const safeLength = len - 1;
          let commentClosed = false;
          while (pos < safeLength) {
            const ch = text.charCodeAt(pos);
            if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text.substring(start, pos);
          return token2 = 13;
        }
        value += String.fromCharCode(code);
        pos++;
        return token2 = 16;
      // numbers
      case 45:
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token2 = 16;
        }
      // found a minus, followed by a number so
      // we fall through to proceed with scanning
      // numbers
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token2 = 11;
      // literals and unknown symbols
      default:
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token2 = 8;
            case "false":
              return token2 = 9;
            case "null":
              return token2 = 7;
          }
          return token2 = 16;
        }
        value += String.fromCharCode(code);
        pos++;
        return token2 = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    let result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition,
    getPosition: () => pos,
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: () => token2,
    getTokenValue: () => value,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => pos - tokenOffset,
    getTokenStartLine: () => lineStartOffset,
    getTokenStartCharacter: () => tokenOffset - prevTokenLineStartOffset,
    getTokenError: () => scanError
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
  CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
  CharacterCodes2[CharacterCodes2["space"] = 32] = "space";
  CharacterCodes2[CharacterCodes2["_0"] = 48] = "_0";
  CharacterCodes2[CharacterCodes2["_1"] = 49] = "_1";
  CharacterCodes2[CharacterCodes2["_2"] = 50] = "_2";
  CharacterCodes2[CharacterCodes2["_3"] = 51] = "_3";
  CharacterCodes2[CharacterCodes2["_4"] = 52] = "_4";
  CharacterCodes2[CharacterCodes2["_5"] = 53] = "_5";
  CharacterCodes2[CharacterCodes2["_6"] = 54] = "_6";
  CharacterCodes2[CharacterCodes2["_7"] = 55] = "_7";
  CharacterCodes2[CharacterCodes2["_8"] = 56] = "_8";
  CharacterCodes2[CharacterCodes2["_9"] = 57] = "_9";
  CharacterCodes2[CharacterCodes2["a"] = 97] = "a";
  CharacterCodes2[CharacterCodes2["b"] = 98] = "b";
  CharacterCodes2[CharacterCodes2["c"] = 99] = "c";
  CharacterCodes2[CharacterCodes2["d"] = 100] = "d";
  CharacterCodes2[CharacterCodes2["e"] = 101] = "e";
  CharacterCodes2[CharacterCodes2["f"] = 102] = "f";
  CharacterCodes2[CharacterCodes2["g"] = 103] = "g";
  CharacterCodes2[CharacterCodes2["h"] = 104] = "h";
  CharacterCodes2[CharacterCodes2["i"] = 105] = "i";
  CharacterCodes2[CharacterCodes2["j"] = 106] = "j";
  CharacterCodes2[CharacterCodes2["k"] = 107] = "k";
  CharacterCodes2[CharacterCodes2["l"] = 108] = "l";
  CharacterCodes2[CharacterCodes2["m"] = 109] = "m";
  CharacterCodes2[CharacterCodes2["n"] = 110] = "n";
  CharacterCodes2[CharacterCodes2["o"] = 111] = "o";
  CharacterCodes2[CharacterCodes2["p"] = 112] = "p";
  CharacterCodes2[CharacterCodes2["q"] = 113] = "q";
  CharacterCodes2[CharacterCodes2["r"] = 114] = "r";
  CharacterCodes2[CharacterCodes2["s"] = 115] = "s";
  CharacterCodes2[CharacterCodes2["t"] = 116] = "t";
  CharacterCodes2[CharacterCodes2["u"] = 117] = "u";
  CharacterCodes2[CharacterCodes2["v"] = 118] = "v";
  CharacterCodes2[CharacterCodes2["w"] = 119] = "w";
  CharacterCodes2[CharacterCodes2["x"] = 120] = "x";
  CharacterCodes2[CharacterCodes2["y"] = 121] = "y";
  CharacterCodes2[CharacterCodes2["z"] = 122] = "z";
  CharacterCodes2[CharacterCodes2["A"] = 65] = "A";
  CharacterCodes2[CharacterCodes2["B"] = 66] = "B";
  CharacterCodes2[CharacterCodes2["C"] = 67] = "C";
  CharacterCodes2[CharacterCodes2["D"] = 68] = "D";
  CharacterCodes2[CharacterCodes2["E"] = 69] = "E";
  CharacterCodes2[CharacterCodes2["F"] = 70] = "F";
  CharacterCodes2[CharacterCodes2["G"] = 71] = "G";
  CharacterCodes2[CharacterCodes2["H"] = 72] = "H";
  CharacterCodes2[CharacterCodes2["I"] = 73] = "I";
  CharacterCodes2[CharacterCodes2["J"] = 74] = "J";
  CharacterCodes2[CharacterCodes2["K"] = 75] = "K";
  CharacterCodes2[CharacterCodes2["L"] = 76] = "L";
  CharacterCodes2[CharacterCodes2["M"] = 77] = "M";
  CharacterCodes2[CharacterCodes2["N"] = 78] = "N";
  CharacterCodes2[CharacterCodes2["O"] = 79] = "O";
  CharacterCodes2[CharacterCodes2["P"] = 80] = "P";
  CharacterCodes2[CharacterCodes2["Q"] = 81] = "Q";
  CharacterCodes2[CharacterCodes2["R"] = 82] = "R";
  CharacterCodes2[CharacterCodes2["S"] = 83] = "S";
  CharacterCodes2[CharacterCodes2["T"] = 84] = "T";
  CharacterCodes2[CharacterCodes2["U"] = 85] = "U";
  CharacterCodes2[CharacterCodes2["V"] = 86] = "V";
  CharacterCodes2[CharacterCodes2["W"] = 87] = "W";
  CharacterCodes2[CharacterCodes2["X"] = 88] = "X";
  CharacterCodes2[CharacterCodes2["Y"] = 89] = "Y";
  CharacterCodes2[CharacterCodes2["Z"] = 90] = "Z";
  CharacterCodes2[CharacterCodes2["asterisk"] = 42] = "asterisk";
  CharacterCodes2[CharacterCodes2["backslash"] = 92] = "backslash";
  CharacterCodes2[CharacterCodes2["closeBrace"] = 125] = "closeBrace";
  CharacterCodes2[CharacterCodes2["closeBracket"] = 93] = "closeBracket";
  CharacterCodes2[CharacterCodes2["colon"] = 58] = "colon";
  CharacterCodes2[CharacterCodes2["comma"] = 44] = "comma";
  CharacterCodes2[CharacterCodes2["dot"] = 46] = "dot";
  CharacterCodes2[CharacterCodes2["doubleQuote"] = 34] = "doubleQuote";
  CharacterCodes2[CharacterCodes2["minus"] = 45] = "minus";
  CharacterCodes2[CharacterCodes2["openBrace"] = 123] = "openBrace";
  CharacterCodes2[CharacterCodes2["openBracket"] = 91] = "openBracket";
  CharacterCodes2[CharacterCodes2["plus"] = 43] = "plus";
  CharacterCodes2[CharacterCodes2["slash"] = 47] = "slash";
  CharacterCodes2[CharacterCodes2["formFeed"] = 12] = "formFeed";
  CharacterCodes2[CharacterCodes2["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));

// node_modules/jsonc-parser/lib/esm/impl/string-intern.js
var cachedSpaces = new Array(20).fill(0).map((_, index) => {
  return " ".repeat(index);
});
var maxCachedValues = 200;
var cachedBreakLinesWithSpaces = {
  " ": {
    "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\n" + " ".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r" + " ".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r\n" + " ".repeat(index);
    })
  },
  "	": {
    "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\n" + "	".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r" + "	".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r\n" + "	".repeat(index);
    })
  }
};

// node_modules/jsonc-parser/lib/esm/impl/parser.js
var ParseOptions;
(function(ParseOptions2) {
  ParseOptions2.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
function parse(text, errors = [], options = ParseOptions.DEFAULT) {
  let currentProperty = null;
  let currentParent = [];
  const previousParents = [];
  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }
  const visitor = {
    onObjectBegin: () => {
      const object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: (name) => {
      currentProperty = name;
    },
    onObjectEnd: () => {
      currentParent = previousParents.pop();
    },
    onArrayBegin: () => {
      const array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: () => {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: (error, offset, length) => {
      errors.push({ error, offset, length });
    }
  };
  visit(text, visitor, options);
  return currentParent[0];
}
function visit(text, visitor, options = ParseOptions.DEFAULT) {
  const _scanner = createScanner(text, false);
  const _jsonPath = [];
  let suppressedCallbacks = 0;
  function toNoArgVisit(visitFunction) {
    return visitFunction ? () => suppressedCallbacks === 0 && visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
  }
  function toOneArgVisit(visitFunction) {
    return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
  }
  function toOneArgVisitWithPath(visitFunction) {
    return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) : () => true;
  }
  function toBeginVisit(visitFunction) {
    return visitFunction ? () => {
      if (suppressedCallbacks > 0) {
        suppressedCallbacks++;
      } else {
        let cbReturn = visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice());
        if (cbReturn === false) {
          suppressedCallbacks = 1;
        }
      }
    } : () => true;
  }
  function toEndVisit(visitFunction) {
    return visitFunction ? () => {
      if (suppressedCallbacks > 0) {
        suppressedCallbacks--;
      }
      if (suppressedCallbacks === 0) {
        visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
      }
    } : () => true;
  }
  const onObjectBegin = toBeginVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisitWithPath(visitor.onObjectProperty), onObjectEnd = toEndVisit(visitor.onObjectEnd), onArrayBegin = toBeginVisit(visitor.onArrayBegin), onArrayEnd = toEndVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisitWithPath(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
  const disallowComments = options && options.disallowComments;
  const allowTrailingComma = options && options.allowTrailingComma;
  function scanNext() {
    while (true) {
      const token2 = _scanner.scan();
      switch (_scanner.getTokenError()) {
        case 4:
          handleError(
            14
            /* ParseErrorCode.InvalidUnicode */
          );
          break;
        case 5:
          handleError(
            15
            /* ParseErrorCode.InvalidEscapeCharacter */
          );
          break;
        case 3:
          handleError(
            13
            /* ParseErrorCode.UnexpectedEndOfNumber */
          );
          break;
        case 1:
          if (!disallowComments) {
            handleError(
              11
              /* ParseErrorCode.UnexpectedEndOfComment */
            );
          }
          break;
        case 2:
          handleError(
            12
            /* ParseErrorCode.UnexpectedEndOfString */
          );
          break;
        case 6:
          handleError(
            16
            /* ParseErrorCode.InvalidCharacter */
          );
          break;
      }
      switch (token2) {
        case 12:
        case 13:
          if (disallowComments) {
            handleError(
              10
              /* ParseErrorCode.InvalidCommentToken */
            );
          } else {
            onComment();
          }
          break;
        case 16:
          handleError(
            1
            /* ParseErrorCode.InvalidSymbol */
          );
          break;
        case 15:
        case 14:
          break;
        default:
          return token2;
      }
    }
  }
  function handleError(error, skipUntilAfter = [], skipUntil = []) {
    onError(error);
    if (skipUntilAfter.length + skipUntil.length > 0) {
      let token2 = _scanner.getToken();
      while (token2 !== 17) {
        if (skipUntilAfter.indexOf(token2) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token2) !== -1) {
          break;
        }
        token2 = scanNext();
      }
    }
  }
  function parseString(isValue) {
    const value = _scanner.getTokenValue();
    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
      _jsonPath.push(value);
    }
    scanNext();
    return true;
  }
  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11:
        const tokenValue = _scanner.getTokenValue();
        let value = Number(tokenValue);
        if (isNaN(value)) {
          handleError(
            2
            /* ParseErrorCode.InvalidNumberFormat */
          );
          value = 0;
        }
        onLiteralValue(value);
        break;
      case 7:
        onLiteralValue(null);
        break;
      case 8:
        onLiteralValue(true);
        break;
      case 9:
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    scanNext();
    return true;
  }
  function parseProperty() {
    if (_scanner.getToken() !== 10) {
      handleError(3, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
      return false;
    }
    parseString(false);
    if (_scanner.getToken() === 6) {
      onSeparator(":");
      scanNext();
      if (!parseValue()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
    } else {
      handleError(5, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
    }
    _jsonPath.pop();
    return true;
  }
  function parseObject() {
    onObjectBegin();
    scanNext();
    let needsComma = false;
    while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 2 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (!parseProperty()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onObjectEnd();
    if (_scanner.getToken() !== 2) {
      handleError(7, [
        2
        /* SyntaxKind.CloseBraceToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseArray() {
    onArrayBegin();
    scanNext();
    let isFirstElement = true;
    let needsComma = false;
    while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 4 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (isFirstElement) {
        _jsonPath.push(0);
        isFirstElement = false;
      } else {
        _jsonPath[_jsonPath.length - 1]++;
      }
      if (!parseValue()) {
        handleError(4, [], [
          4,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onArrayEnd();
    if (!isFirstElement) {
      _jsonPath.pop();
    }
    if (_scanner.getToken() !== 4) {
      handleError(8, [
        4
        /* SyntaxKind.CloseBracketToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseValue() {
    switch (_scanner.getToken()) {
      case 3:
        return parseArray();
      case 1:
        return parseObject();
      case 10:
        return parseString(true);
      default:
        return parseLiteral();
    }
  }
  scanNext();
  if (_scanner.getToken() === 17) {
    if (options.allowEmptyContent) {
      return true;
    }
    handleError(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, [], []);
    return false;
  }
  if (_scanner.getToken() !== 17) {
    handleError(9, [], []);
  }
  return true;
}

// node_modules/jsonc-parser/lib/esm/main.js
var ScanError;
(function(ScanError2) {
  ScanError2[ScanError2["None"] = 0] = "None";
  ScanError2[ScanError2["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
  ScanError2[ScanError2["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
  ScanError2[ScanError2["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
  ScanError2[ScanError2["InvalidUnicode"] = 4] = "InvalidUnicode";
  ScanError2[ScanError2["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
  ScanError2[ScanError2["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind2) {
  SyntaxKind2[SyntaxKind2["OpenBraceToken"] = 1] = "OpenBraceToken";
  SyntaxKind2[SyntaxKind2["CloseBraceToken"] = 2] = "CloseBraceToken";
  SyntaxKind2[SyntaxKind2["OpenBracketToken"] = 3] = "OpenBracketToken";
  SyntaxKind2[SyntaxKind2["CloseBracketToken"] = 4] = "CloseBracketToken";
  SyntaxKind2[SyntaxKind2["CommaToken"] = 5] = "CommaToken";
  SyntaxKind2[SyntaxKind2["ColonToken"] = 6] = "ColonToken";
  SyntaxKind2[SyntaxKind2["NullKeyword"] = 7] = "NullKeyword";
  SyntaxKind2[SyntaxKind2["TrueKeyword"] = 8] = "TrueKeyword";
  SyntaxKind2[SyntaxKind2["FalseKeyword"] = 9] = "FalseKeyword";
  SyntaxKind2[SyntaxKind2["StringLiteral"] = 10] = "StringLiteral";
  SyntaxKind2[SyntaxKind2["NumericLiteral"] = 11] = "NumericLiteral";
  SyntaxKind2[SyntaxKind2["LineCommentTrivia"] = 12] = "LineCommentTrivia";
  SyntaxKind2[SyntaxKind2["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
  SyntaxKind2[SyntaxKind2["LineBreakTrivia"] = 14] = "LineBreakTrivia";
  SyntaxKind2[SyntaxKind2["Trivia"] = 15] = "Trivia";
  SyntaxKind2[SyntaxKind2["Unknown"] = 16] = "Unknown";
  SyntaxKind2[SyntaxKind2["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
var parse2 = parse;
var ParseErrorCode;
(function(ParseErrorCode2) {
  ParseErrorCode2[ParseErrorCode2["InvalidSymbol"] = 1] = "InvalidSymbol";
  ParseErrorCode2[ParseErrorCode2["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
  ParseErrorCode2[ParseErrorCode2["PropertyNameExpected"] = 3] = "PropertyNameExpected";
  ParseErrorCode2[ParseErrorCode2["ValueExpected"] = 4] = "ValueExpected";
  ParseErrorCode2[ParseErrorCode2["ColonExpected"] = 5] = "ColonExpected";
  ParseErrorCode2[ParseErrorCode2["CommaExpected"] = 6] = "CommaExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBraceExpected"] = 7] = "CloseBraceExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBracketExpected"] = 8] = "CloseBracketExpected";
  ParseErrorCode2[ParseErrorCode2["EndOfFileExpected"] = 9] = "EndOfFileExpected";
  ParseErrorCode2[ParseErrorCode2["InvalidCommentToken"] = 10] = "InvalidCommentToken";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
  ParseErrorCode2[ParseErrorCode2["InvalidUnicode"] = 14] = "InvalidUnicode";
  ParseErrorCode2[ParseErrorCode2["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
  ParseErrorCode2[ParseErrorCode2["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));

// src/core/sources.ts
var configHome = (home) => {
  const override = process.env.XDG_CONFIG_HOME;
  return override && path.isAbsolute(override) ? override : path.join(home, ".config");
};
var normalizeProjectDirectory = (value) => {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text || text.length > 4096 || !path.isAbsolute(text)) return null;
  return path.resolve(text);
};
var resolveSources = ({ home, projectDirectory }) => {
  const config = configHome(home);
  const global = [
    { id: "opencode-global", scope: "global", label: "Global OpenCode", path: path.join(config, "opencode", "skills"), priority: 3e4 },
    { id: "claude-global", scope: "global", label: "Global Claude-compatible", path: path.join(home, ".claude", "skills"), priority: 1e4 },
    { id: "agents-global", scope: "global", label: "Global agent-compatible", path: path.join(home, ".agents", "skills"), priority: 2e4 }
  ];
  const configs = [
    { file: path.join(config, "opencode", "opencode.json"), scope: "global" },
    { file: path.join(config, "opencode", "opencode.jsonc"), scope: "global" }
  ];
  const ancestors = projectDirectory ? [projectDirectory] : [];
  if (projectDirectory) {
    let cursor = projectDirectory;
    while (!existsSync(path.join(cursor, ".git"))) {
      const parent = path.dirname(cursor);
      if (parent === cursor) break;
      cursor = parent;
      ancestors.push(cursor);
    }
    if (!existsSync(path.join(cursor, ".git"))) ancestors.splice(1);
    ancestors.reverse();
  }
  const project = ancestors.flatMap((directory, index) => {
    const suffix = directory === projectDirectory ? "" : `-${createHash("sha256").update(directory).digest("hex").slice(0, 12)}`;
    return [
      { id: `opencode-project${suffix}`, scope: "project", label: "Project OpenCode", path: path.join(directory, ".opencode", "skills"), priority: 4e4 + index },
      { id: `claude-project${suffix}`, scope: "project", label: "Project Claude-compatible", path: path.join(directory, ".claude", "skills"), priority: 10001 + index },
      { id: `agents-project${suffix}`, scope: "project", label: "Project agent-compatible", path: path.join(directory, ".agents", "skills"), priority: 20001 + index }
    ];
  });
  for (const directory of ancestors) {
    for (const name of ["opencode.json", "opencode.jsonc", ".opencode/opencode.json", ".opencode/opencode.jsonc"]) {
      configs.push({ file: path.join(directory, name), scope: "project" });
    }
  }
  const sources = [...global, ...project];
  let priority = 5e4;
  for (const entry of configs) {
    let value;
    try {
      value = parse2(readFileSync(entry.file, "utf8"));
    } catch {
      continue;
    }
    if (!value || typeof value !== "object") continue;
    const skills = value.skills;
    if (!Array.isArray(skills)) continue;
    for (const item of skills) {
      if (typeof item !== "string" || !item || /^https?:\/\//i.test(item)) continue;
      const expanded = item.startsWith("~/") || item.startsWith("~\\") ? path.join(home, item.slice(2)) : item;
      const root = path.resolve(projectDirectory ?? home, expanded);
      const existing = sources.find((source) => source.path === root);
      if (existing) {
        existing.priority = priority++;
        continue;
      }
      sources.push({
        id: `configured-${createHash("sha256").update(root).digest("hex").slice(0, 16)}`,
        scope: entry.scope,
        label: "Configured local skill directory",
        path: root,
        priority: priority++
      });
    }
  }
  return sources;
};
var scanConfig = (value) => typeof value === "string" ? { home: value } : value;

// src/core/skills.ts
var MAX_DEPTH = 6;
var MAX_SKILL_BYTES = 2e6;
var IGNORED_DIRS = /* @__PURE__ */ new Set(["node_modules", ".git", ".svn", ".hg"]);
var CONFLICT_ORDER = {
  both: 0,
  "read-error": 1,
  duplicate: 2,
  invalid: 3,
  empty: 4,
  manual: 5,
  "no-description": 6
};
var SkillsError = class extends Error {
  code;
  status;
  conflicts;
  constructor(code, status, message, conflicts) {
    super(message);
    this.name = "SkillsError";
    this.code = code;
    this.status = status;
    this.conflicts = conflicts;
  }
};
var describeFs = (error) => {
  const code = error.code;
  if (code === "EBUSY" || code === "EPERM") {
    return "The file is locked or permission was denied. Close it in other applications and rescan.";
  }
  if (code === "EACCES") return "Permission denied";
  if (code === "ENOENT") return "Path does not exist";
  if (code === "ENOTDIR") return "Not a directory";
  if (code === "EISDIR") return "Is a directory";
  return error instanceof Error ? error.message : "File system error";
};
var parseBoolean = (value) => {
  const text = value.trim().toLowerCase();
  if (["true", "yes", "on", "1"].includes(text)) return true;
  if (["false", "no", "off", "0"].includes(text)) return false;
  return void 0;
};
var unquote = (value) => {
  const text = value.trim();
  if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
  }
  if (text.length >= 2 && text.startsWith("'") && text.endsWith("'")) {
    return text.slice(1, -1).replace(/''/g, "'");
  }
  return text;
};
var stripComment = (value) => {
  let quote = null;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index] ?? "";
    if (quote) {
      if (char === quote && value[index - 1] !== "\\") quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === "#" && (index === 0 || /\s/.test(value[index - 1] ?? ""))) {
      return value.slice(0, index).trimEnd();
    }
  }
  return value;
};
var fallbackFrontmatter = (id) => ({
  name: id,
  description: "",
  autoInvokeOff: false,
  hasFrontmatter: false,
  valid: true,
  empty: false
});
var parseFrontmatter = (text, id) => {
  const withoutBom = text.replace(/^\uFEFF/, "");
  if (withoutBom.trim().length === 0) {
    return { ...fallbackFrontmatter(id), empty: true };
  }
  const lines = withoutBom.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return fallbackFrontmatter(id);
  let end = -1;
  for (let index = 1; index < lines.length; index += 1) {
    const value = lines[index]?.trim();
    if (value === "---" || value === "...") {
      end = index;
      break;
    }
  }
  if (end < 0) {
    return { ...fallbackFrontmatter(id), hasFrontmatter: true, valid: false };
  }
  const block = lines.slice(1, end);
  let name = "";
  let description = "";
  let disable;
  let metaAutoInvoke;
  for (let index = 0; index < block.length; index += 1) {
    const line = block[index] ?? "";
    if (line.trim().length === 0 || /^\s/.test(line)) continue;
    const match = /^([^:]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = (match[1] ?? "").trim().replace(/^["']|["']$/g, "");
    const raw = stripComment((match[2] ?? "").trim());
    if (key === "name" || key === "description") {
      let value = raw;
      if (/^[>|][+-]?$/.test(value)) {
        const folded = value.startsWith(">");
        const collected = [];
        let cursor = index + 1;
        while (cursor < block.length) {
          const next = block[cursor] ?? "";
          if (next.trim().length > 0 && !/^\s/.test(next)) break;
          collected.push(next);
          cursor += 1;
        }
        const indents = collected.filter((item) => item.trim().length > 0).map((item) => item.match(/^\s*/)?.[0].length ?? 0);
        const base = indents.length > 0 ? Math.min(...indents) : 0;
        value = collected.map((item) => item.slice(Math.min(base, item.length))).join(folded ? " " : "\n").trim();
        index = cursor - 1;
      } else {
        value = unquote(value);
      }
      if (key === "name") name = value.trim();
      else description = value.trim();
      continue;
    }
    if (key === "disable-model-invocation") {
      disable = parseBoolean(unquote(raw));
      continue;
    }
    if (key === "metadata") {
      if (raw.startsWith("{")) {
        const inline = /["']?opencode\/autoinvoke["']?\s*:\s*(true|false|yes|no|on|off|1|0)/i.exec(raw);
        if (inline) metaAutoInvoke = parseBoolean(inline[1] ?? "");
        continue;
      }
      let cursor = index + 1;
      while (cursor < block.length) {
        const next = block[cursor] ?? "";
        if (next.trim().length > 0 && !/^\s/.test(next)) break;
        const nested = /^\s+["']?opencode\/autoinvoke["']?\s*:\s*(.*)$/.exec(next);
        if (nested) metaAutoInvoke = parseBoolean(unquote(nested[1] ?? ""));
        cursor += 1;
      }
      index = cursor - 1;
    }
  }
  return {
    name: name.trim() || id,
    description: description.trim(),
    autoInvokeOff: metaAutoInvoke !== void 0 ? !metaAutoInvoke : disable === true,
    hasFrontmatter: true,
    valid: true,
    empty: false
  };
};
var rootView = async (source) => {
  try {
    const info = await fs.stat(source.path);
    return {
      sourceId: source.id,
      scope: source.scope,
      label: source.label,
      path: source.path,
      exists: info.isDirectory(),
      error: info.isDirectory() ? null : "Not a directory"
    };
  } catch (error) {
    const code = error.code;
    return {
      sourceId: source.id,
      scope: source.scope,
      label: source.label,
      path: source.path,
      exists: false,
      error: code === "ENOENT" ? null : describeFs(error)
    };
  }
};
var classify = async (directory, entry) => {
  if (entry.isFile()) return "file";
  if (entry.isDirectory()) return "dir";
  if (!entry.isSymbolicLink()) return "other";
  try {
    const info = await fs.stat(path2.join(directory, entry.name));
    return info.isFile() ? "file" : info.isDirectory() ? "dir" : "other";
  } catch {
    return "other";
  }
};
var readFrontmatterFor = async (id, activePath, disabledPath) => {
  let activeError = null;
  if (activePath) {
    try {
      const info = await fs.stat(activePath);
      if (info.size > MAX_SKILL_BYTES) activeError = "The entry file exceeds 2 MB";
      else {
        const text = await fs.readFile(activePath, "utf8");
        return { frontmatter: parseFrontmatter(text, id), error: null };
      }
    } catch (error) {
      activeError = describeFs(error);
    }
  }
  if (disabledPath) {
    try {
      const info = await fs.stat(disabledPath);
      if (info.size > MAX_SKILL_BYTES) {
        return { frontmatter: fallbackFrontmatter(id), error: activeError ?? "The disabled entry exceeds 2 MB" };
      }
      const text = await fs.readFile(disabledPath, "utf8");
      return { frontmatter: parseFrontmatter(text, id), error: activeError };
    } catch (error) {
      return { frontmatter: fallbackFrontmatter(id), error: activeError ?? describeFs(error) };
    }
  }
  return { frontmatter: fallbackFrontmatter(id), error: activeError ?? "Could not read the entry file" };
};
var scanDirectory = async (root, source, directory, depth, entries, visited) => {
  let dirents;
  try {
    dirents = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (!root.error) root.error = `Could not read ${directory}: ${describeFs(error)}`;
    return;
  }
  const visible = dirents.filter((entry) => !entry.name.startsWith(".") && !IGNORED_DIRS.has(entry.name));
  const classified = await Promise.all(visible.map(async (entry) => ({ entry, kind: await classify(directory, entry) })));
  const active = classified.find((item) => item.kind === "file" && item.entry.name === "SKILL.md");
  const disabled = classified.find((item) => item.kind === "file" && item.entry.name === "SKILL.md.disabled");
  if (active || disabled) {
    const id = path2.basename(directory);
    const activePath = active ? path2.join(directory, "SKILL.md") : null;
    const disabledPath = disabled ? path2.join(directory, "SKILL.md.disabled") : null;
    const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
    entries.push({ id, source, activePath, disabledPath, frontmatter, error });
    if (active) return;
  }
  if (depth === 0) {
    const flat = classified.filter(
      (item) => item.kind === "file" && item.entry.name !== "SKILL.md.disabled" && (item.entry.name.endsWith(".md") || item.entry.name.endsWith(".md.disabled"))
    );
    const ids = /* @__PURE__ */ new Set();
    for (const item of flat) {
      ids.add(item.entry.name.endsWith(".md.disabled") ? item.entry.name.slice(0, -".md.disabled".length) : item.entry.name.slice(0, -".md".length));
    }
    for (const id of ids) {
      const activeItem = flat.find((item) => item.entry.name === `${id}.md`);
      const disabledItem = flat.find((item) => item.entry.name === `${id}.md.disabled`);
      const activePath = activeItem ? path2.join(directory, activeItem.entry.name) : null;
      const disabledPath = disabledItem ? path2.join(directory, disabledItem.entry.name) : null;
      if (!activePath && !disabledPath) continue;
      const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
      entries.push({ id, source, activePath, disabledPath, frontmatter, error });
    }
  }
  if (depth >= MAX_DEPTH) return;
  for (const item of classified) {
    if (item.kind !== "dir") continue;
    const child = path2.join(directory, item.entry.name);
    let real = child;
    try {
      real = await fs.realpath(child);
    } catch {
    }
    if (visited.has(real)) continue;
    visited.add(real);
    await scanDirectory(root, source, child, depth + 1, entries, visited);
  }
};
var addConflict = (conflicts, seen, conflict) => {
  const key = [conflict.kind, conflict.skillId, conflict.activePath ?? "", conflict.disabledPath ?? "", conflict.message].join("|");
  if (seen.has(key)) return;
  seen.add(key);
  conflicts.push(conflict);
};
var estimateTokens = (name, id, description) => Math.max(1, Math.ceil((name.length + id.length + description.length) / 4) + 8);
var compareText = (left, right) => left < right ? -1 : left > right ? 1 : 0;
var buildResponse = (roots, entries, projectDirectory) => {
  const groups = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const key = `${entry.source.id}:${entry.id}`;
    const group = groups.get(key);
    if (group) group.push(entry);
    else groups.set(key, [entry]);
  }
  const skills = [];
  for (const [key, group] of groups) {
    const id = group[0]?.id ?? key;
    const source = group[0]?.source;
    group.sort(
      (left, right) => right.source.priority - left.source.priority || compareText(left.activePath ?? left.disabledPath ?? "", right.activePath ?? right.disabledPath ?? "")
    );
    const active = group.filter((entry) => entry.activePath);
    const disabled = group.filter((entry) => entry.disabledPath);
    const loadable = active.filter((entry) => !entry.error && entry.frontmatter.valid && !entry.frontmatter.empty);
    const winner = loadable.at(-1) ?? active.at(-1) ?? group[0] ?? null;
    const both = group.some((entry) => entry.activePath && entry.disabledPath);
    const state = both ? "conflict" : active.length > 0 && disabled.length > 0 ? "mixed" : active.length > 0 ? "enabled" : "disabled";
    const conflicts2 = [];
    const seen = /* @__PURE__ */ new Set();
    for (const entry of group) {
      if (entry.activePath && entry.disabledPath) {
        addConflict(conflicts2, seen, {
          kind: "both",
          skillId: key,
          message: "Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: true
        });
      }
      if (entry.error) {
        addConflict(conflicts2, seen, {
          kind: "read-error",
          skillId: key,
          message: `Could not read the entry: ${entry.error}`,
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
      if (!entry.frontmatter.valid) {
        addConflict(conflicts2, seen, {
          kind: "invalid",
          skillId: key,
          message: "The frontmatter is not closed; OpenCode may skip this skill, but the entry switch still works.",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
      if (entry.frontmatter.empty) {
        addConflict(conflicts2, seen, {
          kind: "empty",
          skillId: key,
          message: "The entry file is empty; OpenCode will not load it.",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
    }
    if (group.length > 1) {
      const winnerLabel = winner ? winner.activePath ?? winner.disabledPath ?? "Unknown entry" : "None (entry cannot be loaded)";
      addConflict(conflicts2, seen, {
        kind: "duplicate",
        skillId: key,
        message: `There are ${group.length} entries with this ID; the effective entry is ${winnerLabel}.`,
        activePath: winner?.activePath ?? null,
        disabledPath: winner?.disabledPath ?? null,
        blocking: false
      });
    }
    if (winner?.activePath && winner.frontmatter.autoInvokeOff) {
      addConflict(conflicts2, seen, {
        kind: "manual",
        skillId: key,
        message: "The entry is enabled but marked for manual invocation only; the model cannot see it.",
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false
      });
    }
    if (winner?.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && !winner.frontmatter.description.trim()) {
      addConflict(conflicts2, seen, {
        kind: "no-description",
        skillId: key,
        message: "The entry is enabled but has no description; the model will not select it automatically.",
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false
      });
    }
    const advertised = Boolean(
      winner && winner.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && winner.frontmatter.description.trim().length > 0 && !winner.frontmatter.autoInvokeOff
    );
    const name = winner?.frontmatter.name || id;
    const description = winner?.frontmatter.description ?? "";
    skills.push({
      key,
      id,
      scope: source?.scope ?? "global",
      sourceId: source?.id ?? "opencode-global",
      rootPath: source?.path ?? "",
      name,
      description,
      state,
      advertised,
      autoInvokeOff: winner?.frontmatter.autoInvokeOff ?? false,
      activePaths: active.flatMap((entry) => entry.activePath ? [entry.activePath] : []),
      disabledPaths: disabled.flatMap((entry) => entry.disabledPath ? [entry.disabledPath] : []),
      conflicts: conflicts2,
      warnings: Array.from(new Set(conflicts2.filter((conflict) => !conflict.blocking).map((conflict) => conflict.message))),
      estimatedTokens: advertised ? estimateTokens(name, id, description) : 0
    });
  }
  const byId = /* @__PURE__ */ new Map();
  for (const skill of skills) {
    const same2 = byId.get(skill.id) ?? [];
    same2.push(skill);
    byId.set(skill.id, same2);
  }
  for (const same2 of byId.values()) {
    if (same2.length < 2) continue;
    const candidates = same2.filter((skill) => skill.activePaths.length > 0);
    const uncertain = candidates.some((skill) => skill.state === "conflict" || skill.conflicts.some((conflict) => ["read-error", "invalid", "empty", "duplicate"].includes(conflict.kind)));
    const ordered = candidates.slice().sort((a, b) => (entries.find((entry) => entry.source.id === b.sourceId)?.source.priority ?? 0) - (entries.find((entry) => entry.source.id === a.sourceId)?.source.priority ?? 0));
    const winner = uncertain ? void 0 : ordered[0];
    for (const skill of same2) {
      skill.duplicateResolution = {
        status: !winner || !skill.activePaths.length ? "unknown" : skill === winner ? "highest-scanned" : "shadowed",
        winningPath: winner?.activePaths[0] ?? null
      };
      skill.warnings.push(
        winner ? `This ID exists in multiple sources. Highest-precedence scanned entry: ${winner.activePaths[0]}. Disabling one copy may leave another enabled; configured sources or permissions may change the result.` : "This ID exists in multiple sources; precedence cannot be determined reliably. Disabling one copy may leave another enabled."
      );
    }
  }
  skills.sort((left, right) => compareText(left.key, right.key));
  const conflicts = skills.flatMap((skill) => skill.conflicts);
  conflicts.sort((left, right) => {
    if (left.blocking !== right.blocking) return left.blocking ? -1 : 1;
    const kind = CONFLICT_ORDER[left.kind] - CONFLICT_ORDER[right.kind];
    return kind !== 0 ? kind : compareText(left.skillId, right.skillId);
  });
  const summary = {
    total: skills.length,
    advertised: skills.filter((skill) => skill.advertised).length,
    disabled: skills.filter((skill) => skill.state === "disabled").length,
    blockingConflicts: conflicts.filter((conflict) => conflict.blocking).length,
    warnings: conflicts.filter((conflict) => !conflict.blocking).length,
    estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0)
  };
  return {
    skills,
    conflicts,
    summary,
    root: roots[0] ?? {
      sourceId: "opencode-global",
      scope: "global",
      label: "Global OpenCode",
      path: "",
      exists: false,
      error: null
    },
    roots,
    projectDirectory,
    scannedAt: Date.now()
  };
};
var scanSkills = async (value) => {
  const config = scanConfig(value);
  const sources = resolveSources(config);
  const roots = await Promise.all(sources.map((source) => rootView(source)));
  const entries = [];
  for (const [index, root] of roots.entries()) {
    const source = sources[index];
    if (!root.exists || !source) continue;
    const visited = /* @__PURE__ */ new Set();
    try {
      visited.add(await fs.realpath(root.path));
    } catch {
      visited.add(root.path);
    }
    await scanDirectory(root, source, root.path, 0, entries, visited);
  }
  return buildResponse(roots, entries, config.projectDirectory ?? null);
};
var findSkill = (skills, idOrKey) => {
  const exact = skills.find((skill) => skill.key === idOrKey);
  if (exact) return exact;
  const matches = skills.filter((skill) => skill.id === idOrKey);
  if (matches.length === 1 && matches[0]) return matches[0];
  if (matches.length > 1) {
    throw new SkillsError(
      "ambiguous",
      400,
      `Several sources have a skill named "${idOrKey}": ${matches.map((skill) => skill.key).join(", ")}.`
    );
  }
  throw new SkillsError("not-found", 404, `Skill ${idOrKey} was not found.`);
};
var exists = async (file) => {
  try {
    await fs.lstat(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
};
var applyMoves = async (moves) => {
  if (moves.length === 0) return;
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError("conflict", 409, `The target entry already exists: ${move.to}`);
      }
      if (!await exists(move.from)) {
        throw new SkillsError("conflict", 409, `The entry changed. Rescan: ${move.from}`);
      }
    }
  } catch (error) {
    if (error instanceof SkillsError) throw error;
    throw new SkillsError("io", 500, `Could not inspect the entry: ${describeFs(error)}`);
  }
  const done = [];
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError("conflict", 409, `The target entry already exists: ${move.to}`);
      }
      await fs.rename(move.from, move.to);
      done.push(move);
      if (await exists(move.from) || !await exists(move.to)) {
        throw new SkillsError("io", 500, `Verification failed after renaming: ${move.to}`);
      }
    }
  } catch (error) {
    for (const move of done.reverse()) {
      try {
        if (await exists(move.to) && !await exists(move.from)) await fs.rename(move.to, move.from);
      } catch {
      }
    }
    if (error instanceof SkillsError) throw error;
    throw new SkillsError("io", 500, `Rename failed: ${describeFs(error)}`);
  }
};
var assertRootReadable = (scan) => {
  const broken = scan.roots.find((root) => root.error);
  if (broken) {
    throw new SkillsError("read-error", 409, `Could not read the ${broken.label} skill directory: ${broken.error}`);
  }
};
var setSkillEnabled = async (value, id, enabled) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const skill = findSkill(before.skills, id);
  if (skill.conflicts.some((conflict) => conflict.kind === "both")) {
    throw new SkillsError("conflict", 409, `Skill ${id} has unresolved entry conflicts.`, skill.conflicts);
  }
  const moves = [];
  if (!enabled) {
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  } else {
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith(".disabled")) {
        throw new SkillsError("io", 500, `Could not identify the disabled entry: ${disabledPath}`);
      }
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  return scanSkills(config);
};
var batchSetEnabled = async (value, enable, disable) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const enableIds = Array.from(new Set(enable));
  const disableIds = Array.from(new Set(disable));
  if (enableIds.some((id) => disableIds.includes(id))) {
    throw new SkillsError("invalid-request", 400, "A skill cannot be enabled and disabled at the same time.");
  }
  if (enableIds.length + disableIds.length > 200) {
    throw new SkillsError("invalid-request", 400, "Too many skills in one operation.");
  }
  const selected = /* @__PURE__ */ new Map();
  for (const id of [...enableIds, ...disableIds]) {
    const skill = findSkill(before.skills, id);
    if (skill.conflicts.some((conflict) => conflict.kind === "both")) {
      throw new SkillsError("conflict", 409, `Skill ${id} has unresolved entry conflicts.`, skill.conflicts);
    }
    selected.set(id, skill);
  }
  const moves = [];
  for (const id of enableIds) {
    const skill = selected.get(id);
    if (!skill) continue;
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith(".disabled")) continue;
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
    }
  }
  for (const id of disableIds) {
    const skill = selected.get(id);
    if (!skill) continue;
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(config);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};
var bulkSetEnabled = async (value, enabled, sourceId) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const blocking = before.conflicts.filter((conflict) => conflict.kind === "both");
  if (blocking.length > 0) {
    throw new SkillsError("conflict", 409, "Unresolved entry conflicts remain; bulk operations are blocked.", blocking);
  }
  const moves = [];
  for (const skill of before.skills) {
    if (sourceId && skill.sourceId !== sourceId) continue;
    if (!enabled) {
      for (const activePath of skill.activePaths) {
        moves.push({ id: skill.key, from: activePath, to: `${activePath}.disabled` });
      }
    } else {
      for (const disabledPath of skill.disabledPaths) {
        if (!disabledPath.endsWith(".disabled")) continue;
        moves.push({ id: skill.key, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
      }
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(config);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};
var resolveBoth = async (value, entryPath, keep) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const skill = before.skills.find(
    (item) => item.activePaths.includes(entryPath) || item.disabledPaths.includes(entryPath)
  );
  if (!skill) throw new SkillsError("not-found", 404, "This entry conflict was not found. Rescan.");
  let activePath = null;
  let disabledPath = null;
  if (skill.activePaths.includes(entryPath)) {
    activePath = entryPath;
    disabledPath = `${entryPath}.disabled`;
  } else if (skill.disabledPaths.includes(entryPath)) {
    disabledPath = entryPath;
    activePath = entryPath.endsWith(".disabled") ? entryPath.slice(0, -".disabled".length) : null;
  }
  if (!activePath || !disabledPath || !skill.activePaths.includes(activePath) || !skill.disabledPaths.includes(disabledPath)) {
    throw new SkillsError("not-found", 404, "This entry conflict was not found. Rescan.");
  }
  const backupPath = `${disabledPath}.conflict-${Date.now()}-${randomUUID().slice(0, 8)}`;
  if (keep === "enabled") {
    await applyMoves([{ id: skill.key, from: disabledPath, to: backupPath }]);
  } else {
    await applyMoves([{ id: skill.key, from: disabledPath, to: backupPath }]);
    try {
      await applyMoves([{ id: skill.key, from: activePath, to: disabledPath }]);
    } catch (error) {
      try {
        await applyMoves([{ id: skill.key, from: backupPath, to: disabledPath }]);
      } catch {
      }
      throw error;
    }
  }
  const after = await scanSkills(config);
  return { ...after, backupPath };
};

// src/core/undo.ts
import fs2 from "node:fs/promises";
import { createHash as createHash2 } from "node:crypto";
var fingerprint = async (file) => {
  const stat = await fs2.lstat(file);
  const kind = stat.isSymbolicLink() ? "link" : stat.isFile() ? "file" : "other";
  if (kind === "other") throw new Error("Not a regular file or symbolic link");
  if (kind === "file" && stat.size > 2e6) throw new Error("Entry exceeds the undo safety limit");
  const data = kind === "link" ? Buffer.from(await fs2.readlink(file)) : await fs2.readFile(file);
  return { kind, hash: createHash2("sha256").update(data).digest("hex"), size: stat.size, mtime: stat.mtimeMs, mode: stat.mode };
};
var same = (a, b) => a.kind === b.kind && a.hash === b.hash && a.size === b.size && a.mtime === b.mtime && a.mode === b.mode;
var BulkUndo = class {
  record = null;
  clear() {
    this.record = null;
  }
  async capture(scan) {
    const files = scan.skills.flatMap((skill) => [...skill.activePaths, ...skill.disabledPaths]);
    const result = /* @__PURE__ */ new Map();
    for (const file of files) result.set(file, await fingerprint(file));
    return result;
  }
  async remember(before, after, captured) {
    this.clear();
    const oldPaths = new Set(before.skills.flatMap((skill) => [...skill.activePaths, ...skill.disabledPaths]));
    const newPaths = new Set(after.skills.flatMap((skill) => [...skill.activePaths, ...skill.disabledPaths]));
    const moves = [];
    for (const old of oldPaths) {
      if (newPaths.has(old)) continue;
      const next = old.endsWith(".disabled") ? old.slice(0, -".disabled".length) : `${old}.disabled`;
      if (!newPaths.has(next)) continue;
      try {
        const current = await fingerprint(next);
        const original = captured.get(old);
        if (!original || !same(original, current)) return false;
        moves.push({ from: next, to: old, fingerprint: current });
      } catch {
        return false;
      }
    }
    if (!moves.length) return false;
    this.record = { directory: before.projectDirectory, moves };
    return true;
  }
  async undo(directory) {
    const record = this.record;
    if (!record || record.directory !== directory) throw new SkillsError("no-undo", 409, "No undo is available for this project.");
    for (const move of record.moves) {
      try {
        if (!same(await fingerprint(move.from), move.fingerprint)) throw new Error("changed");
        try {
          await fs2.lstat(move.to);
          throw new Error("target exists");
        } catch (error) {
          if (error.code !== "ENOENT") throw error;
        }
      } catch {
        throw new SkillsError("conflict", 409, `Cannot undo: the entry changed or its original path exists: ${move.from}`);
      }
    }
    const done = [];
    try {
      for (const move of record.moves) {
        await fs2.rename(move.from, move.to);
        done.push(move);
      }
    } catch {
      for (const move of done.reverse()) {
        try {
          await fs2.rename(move.to, move.from);
        } catch {
        }
      }
      this.clear();
      throw new SkillsError("io", 500, "Undo failed. Some files may need manual restoration; rescan.");
    }
    this.clear();
  }
};

// src/service/main.ts
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var HOME = os.homedir();
var undo = new BulkUndo();
var execFileAsync = promisify(execFile);
var openFolder = async (target) => {
  const command = process.platform === "win32" ? "explorer" : process.platform === "darwin" ? "open" : "xdg-open";
  try {
    await execFileAsync(command, [target]);
  } catch (error) {
    if (process.platform === "win32") return;
    throw error;
  }
};
var json = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
};
var readBody = (req) => new Promise((resolve, reject) => {
  const chunks = [];
  let size = 0;
  let failed = false;
  req.on("data", (chunk) => {
    if (failed) return;
    size += chunk.length;
    if (size > 256 * 1024) {
      failed = true;
      chunks.length = 0;
      reject(new SkillsError("too-large", 413, "The submitted content is too large."));
      return;
    }
    chunks.push(chunk);
  });
  req.on("error", () => reject(new SkillsError("invalid-request", 400, "The request was interrupted. Try again.")));
  req.on("end", () => {
    if (failed) return;
    try {
      const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("not an object");
      }
      resolve(parsed);
    } catch {
      reject(new SkillsError("invalid-request", 400, "The request body must be a valid JSON object."));
    }
  });
});
var queue = Promise.resolve();
var exclusive = (action) => {
  const next = queue.then(() => action(), () => action());
  queue = next.catch(() => void 0);
  return next;
};
var stringField = (body, key, max) => {
  const value = typeof body[key] === "string" ? body[key].trim() : "";
  if (!value) throw new SkillsError("invalid-request", 400, `Missing ${key}.`);
  if (value.length > max) throw new SkillsError("invalid-request", 400, `${key} exceeds the length limit.`);
  return value;
};
var pathField = (body, key, max) => {
  const value = typeof body[key] === "string" ? body[key] : "";
  if (!value || value.length > max) throw new SkillsError("invalid-request", 400, `Missing ${key}.`);
  return value;
};
var booleanField = (body, key) => {
  const value = body[key];
  if (typeof value !== "boolean") throw new SkillsError("invalid-request", 400, `${key} must be a boolean.`);
  return value;
};
var stringArrayField = (body, key) => {
  const value = body[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length === 0 || item.length > 256)) {
    throw new SkillsError("invalid-request", 400, `${key} must be an array of skill IDs.`);
  }
  if (value.length > 200) throw new SkillsError("invalid-request", 400, `Too many ${key} entries.`);
  return value;
};
var scanFor = (directory) => ({
  home: HOME,
  projectDirectory: normalizeProjectDirectory(directory)
});
var verifyPreview = (expected, actual) => {
  if (expected === void 0) return;
  if (!Array.isArray(expected) || expected.some((item) => typeof item !== "string")) {
    throw new SkillsError("invalid-request", 400, "Invalid preview paths.");
  }
  const normalized = (paths) => [...new Set(paths)].sort();
  if (JSON.stringify(normalized(expected)) !== JSON.stringify(normalized(actual))) {
    throw new SkillsError("conflict", 409, "Skill files changed since the preview. Rescan and confirm again.");
  }
};
var handle = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    throw new SkillsError("unauthorized", 401, "unauthorized");
  }
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health" && req.method === "GET") {
    json(res, 200, { ok: true });
    return;
  }
  if (url.pathname === "/skills" && req.method === "GET") {
    const config = scanFor(url.searchParams.get("directory"));
    json(res, 200, await exclusive(() => scanSkills(config)));
    return;
  }
  if (url.pathname === "/skills/toggle" && req.method === "POST") {
    const body = await readBody(req);
    const id = stringField(body, "id", 256);
    const enabled = booleanField(body, "enabled");
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => {
      undo.clear();
      return setSkillEnabled(config, id, enabled);
    }));
    return;
  }
  if (url.pathname === "/skills/bulk" && req.method === "POST") {
    const body = await readBody(req);
    const enabled = booleanField(body, "enabled");
    const sourceId = body.sourceId === void 0 ? null : stringField(body, "sourceId", 256);
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(async () => {
      undo.clear();
      const before = await scanSkills(config);
      const affected = before.skills.filter((skill) => !sourceId || skill.sourceId === sourceId);
      verifyPreview(body.expectedPaths, affected.flatMap((skill) => enabled ? skill.disabledPaths : skill.activePaths));
      const captured = await undo.capture(before);
      const result = await bulkSetEnabled(config, enabled, sourceId);
      return { ...result, undoAvailable: await undo.remember(before, result, captured) };
    }));
    return;
  }
  if (url.pathname === "/skills/batch" && req.method === "POST") {
    const body = await readBody(req);
    const enable = stringArrayField(body, "enable");
    const disable = stringArrayField(body, "disable");
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(async () => {
      undo.clear();
      const before = await scanSkills(config);
      verifyPreview(body.expectedPaths, [
        ...enable.flatMap((id) => findSkill(before.skills, id).disabledPaths),
        ...disable.flatMap((id) => findSkill(before.skills, id).activePaths)
      ]);
      const captured = await undo.capture(before);
      const result = await batchSetEnabled(config, enable, disable);
      return { ...result, undoAvailable: await undo.remember(before, result, captured) };
    }));
    return;
  }
  if (url.pathname === "/skills/undo" && req.method === "POST") {
    const body = await readBody(req);
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(async () => {
      await undo.undo(config.projectDirectory ?? null);
      return scanSkills(config);
    }));
    return;
  }
  if (url.pathname === "/skills/resolve" && req.method === "POST") {
    const body = await readBody(req);
    const entryPath = pathField(body, "path", 4096);
    const keep = body.keep === "enabled" || body.keep === "disabled" ? body.keep : null;
    if (!keep) throw new SkillsError("invalid-request", 400, "keep must be enabled or disabled.");
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => {
      undo.clear();
      return resolveBoth(config, entryPath, keep);
    }));
    return;
  }
  if (url.pathname === "/sources/open" && req.method === "POST") {
    const body = await readBody(req);
    const target = pathField(body, "path", 4096);
    const config = scanFor(body.directory);
    const snapshot = await scanSkills(config);
    const root = snapshot.roots.find((item) => item.path === target);
    if (!root) throw new SkillsError("invalid-request", 400, "Unknown skill source path.");
    if (!root.exists) throw new SkillsError("not-found", 404, "Skill source directory does not exist.");
    await openFolder(target);
    json(res, 200, { ok: true });
    return;
  }
  throw new SkillsError("not-found", 404, "not-found");
};
var server = http.createServer((req, res) => {
  void handle(req, res).catch((error) => {
    if (res.headersSent || res.destroyed) return;
    if (error instanceof SkillsError) {
      json(res, error.status, {
        error: error.message,
        code: error.code,
        ...error instanceof SkillsError && error.conflicts ? { conflicts: error.conflicts } : {}
      });
      return;
    }
    console.error("skills service:", error instanceof Error ? error.message : error);
    json(res, 500, { error: "The local service failed to process the request. Try again.", code: "internal" });
  });
});
server.listen(port, "127.0.0.1");
