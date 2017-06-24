'use strict';
const { isNegative, isPositive } = require('./signs');
const {
  forceCondition,
  forceNumber,
  forceString,
  forceNonNegativeNumber
} = require('./type-check');

const RE_NON_ZERO = /^(-?)0*([1-9][0-9]*)$/;
const RE_ZERO = /^0+$/;

const forcePositiveString = (value) => {
  forceString(value);
  forceCondition(value, isPositive, 'isPositive');
};

const normalize = (strint) => {
  if (RE_ZERO.test(strint)) {
    return "0";
  }
  var match = RE_NON_ZERO.exec(strint);
  if (!match) {
    throw new Error("Illegal strint format: "+strint);
  }
  return match[1]+match[2];
};

const leftPadZeros = (strint, digitCount) => {
  forcePositiveString(strint);
  forceNonNegativeNumber(digitCount);
  return prefixZeros(strint, digitCount-strint.length);
}

const prefixZeros = (strint, zeroCount) => {
  forcePositiveString(strint);
  forceNonNegativeNumber(zeroCount);

  var result = strint;
  for (var i = 0; i < zeroCount; i++) {
    result = "0" + result;
  }
  return result;
};

const getDigit = (x, digitIndex) => {
  forceString(x);
  forceNumber(digitIndex);
  if (digitIndex >= getDigitCount(x)) {
    return "0";
  } else {
    return x.charAt(x.length - digitIndex - 1);
  }
};

const getDigitCount = (strint) => {
  if (isNegative(strint)) {
    return strint.length - 1;
  } else {
    return strint.length;
  }
};

const shiftLeft = (strint, digitCount) => {
  while(digitCount > 0) {
    strint = strint + "0";
    digitCount--;
  }
  return strint;
}

module.exports = {
  prefixZeros,
  leftPadZeros,
  getDigit,
  getDigitCount,
  forcePositiveString,
  normalize,
  shiftLeft
};