'use strict';
const { forceString } = require('./type-check');

const isNegative = (strint) => {
  forceString(strint);
  return (strint.indexOf("-") === 0);
};

const isPositive = (strint) => {
  return !isNegative(strint);
};

const abs = (strint) => {
  if (isNegative(strint)) {
    return negate(strint);
  } else {
    return strint;
  }
};

const negate = (strint) => {
  if (strint === "0") {
    return "0";
  }
  if (isNegative(strint)) {
    return strint.slice(1);
  } else {
    return "-" + strint;
  }
};

const sameSign = (lhs, rhs) => {
  return isPositive(lhs) === isPositive(rhs);
}

module.exports = {
  isPositive,
  isNegative,
  abs,
  negate,
  sameSign
};