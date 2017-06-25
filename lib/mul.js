'use strict';
const { forceString, forceNumber } = require('../utils/type-check');
const {
  forcePositiveString,
  getDigitCount,
  getDigit,
  prefixZeros,
  shiftLeft
} = require('../utils/utils');

const { sameSign, abs, negate } = require('../utils/signs');
const { sumPositive } = require('./sum');

const mulDigit = (strint, digit) => {
  forcePositiveString(strint);
  forceNumber(digit);
  var result = "";
  var digitCount = getDigitCount(strint);
  var carry = 0;
  var leadingZeros = 0;
  for (var i = 0; i < digitCount; i++) {
    var digitResult = (Number(getDigit(strint, i)) * digit) + carry;
    carry = 0;
    while (digitResult >= 10) {
      digitResult -= 10;
      carry++;
    }
    if (digitResult === 0) {
      leadingZeros++;
    } else {
      result = String(digitResult) + prefixZeros(result, leadingZeros);
      leadingZeros = 0;
    }
  }
  if (carry > 0) {
    // if(leadingZeros){
    //   carry = shiftLeft(carry, leadingZeros);
    //   result = String(carry);
    // } else{
    //   result = String(carry) + (result !== "" ? result : "0");
    // }
    if(result){
      if(leadingZeros){
        result = shiftLeft(carry, leadingZeros) + result;
      } else {
        result = String(carry) + result;
      }
    } else {
      result = String(carry) + '0';
    }

  }
  return result.length === 0 ? "0" : result;
};

const mulPositive = (lhs, rhs) => {
  /* Example via http://en.wikipedia.org/wiki/Multiplication_algorithm
   23958233
   5830 ×
   ------------
   00000000 ( =      23,958,233 ×     0)
   71874699  ( =      23,958,233 ×    30)
   191665864   ( =      23,958,233 ×   800)
   119791165    ( =      23,958,233 × 5,000)
   ------------
   139676498390 ( = 139,676,498,390        )
   */

  forcePositiveString(lhs);
  forcePositiveString(rhs);
  if(handleMultiZeros(lhs, rhs)){
    return '0';
  }

  var result = "0";
  var digitCount = getDigitCount(rhs);
  for (var i = 0; i < digitCount; i++) {
    var singleRow = mulDigit(lhs, Number(getDigit(rhs, i)));
    singleRow = shiftLeft(singleRow, i);
    result = sumPositive(result, singleRow);
  }
  return result;
}

const handleMultiZeros = (a, b) => {
  return a === "0" || a === "0" ? "0" : ""
}
module.exports = (lhs, rhs) => {
  forceString(lhs);
  forceString(rhs);

  var absResult = mulPositive(abs(lhs), abs(rhs));
  return (sameSign(lhs, rhs) ? absResult : negate(absResult));
};