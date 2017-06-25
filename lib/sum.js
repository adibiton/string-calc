'use strict';
const EMPTY_STRING = '';
const {
  forceString
} = require('../utils/type-check');

const {
  isPositive,
  isNegative,
  abs,
  negate
} = require('../utils/signs');

const {
  lt,
  ge
} = require('../utils/compare');

const {
  prefixZeros,
  postfixZeros,
  getDigit,
  forcePositiveString
} = require('../utils/utils');

const sumPositive = (x, y) => {
  forcePositiveString(x);
  forcePositiveString(y);

  const res = handleSumZeros(x,y);
  if(res != EMPTY_STRING){
    return res;
  }

  var maxLength = Math.max(x.length, y.length);
  var result = "";
  var borrow = 0;
  var leadingZeros = 0;
  for (var i = 0; i < maxLength; i++) {
    var lhs = Number(getDigit(x, i));
    var rhs = Number(getDigit(y, i));
    var digit = lhs + rhs + borrow;
    borrow = 0;
    while (digit >= 10) {
      digit -= 10;
      borrow++;
    }
    if (digit === 0) {
      leadingZeros++;
    } else {
      result = String(digit) + prefixZeros(result, leadingZeros);
      leadingZeros = 0;
    }
  }
  if (borrow > 0) {
    result = postfixZeros(String(borrow), leadingZeros) + result;
  }
  return result;
};

const subPositive = (x, y) => {
  forcePositiveString(x);
  forcePositiveString(y);
  if (!ge(x, y)) {
    throw new Error("x must be greater or equal to y");
  }

  var maxLength = Math.max(x.length, y.length);
  var result = "";
  var borrow = 0;
  var leadingZeros = 0;
  for (var i = 0; i < maxLength; i++) {
    var lhs = Number(getDigit(x, i)) - borrow;
    borrow = 0;
    var rhs = Number(getDigit(y, i));
    while (lhs < rhs) {
      lhs += 10;
      borrow++;
    }
    var digit = String(lhs - rhs);
    if (digit !== "0") {
      result = digit + prefixZeros(result, leadingZeros);
      leadingZeros = 0;
    } else {
      leadingZeros++;
    }
  }
  return result.length === 0 ? "0" : result;
};

const sum = (a, b) => {
  forceString(a);
  forceString(b);

  if (isPositive(a) && isPositive(b)) {
    return sumPositive(a, b);
  } else if (isNegative(a) && isNegative(b)) {
    return negate(sumPositive(abs(a), abs(b)));
  } else {
    if (lt(abs(a), abs(b))) {
      var tmp = a;
      a = b;
      b = tmp;
    }
    // |a| >= |b|
    var absResult = subPositive(abs(a), abs(b));
    if (isPositive(a)) {
      // Example: 5 + -3
      return absResult;
    } else {
      // Example: -5 + 3
      return negate(absResult);
    }
  }
};

const handleSumZeros = (x,y) => {
  if(x === '0')
    return y;
  if(y === '0')
    return x;
  return EMPTY_STRING;
};

module.exports = {
  sum,
  sumPositive
};

