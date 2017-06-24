'ust strict';

const {
  isNegative,
  isPositive,
  abs
} = require('./signs');

const {
  leftPadZeros,
  normalize
} = require('./utils');

const ltPositive = (x, y) => {
  if (isNegative(x) || isNegative(y)) {
    throw new Error("Both operands must be positive: " + x + " " + y);
  }
  var maxLength = Math.max(x.length, y.length);
  var lhs = leftPadZeros(x, maxLength);
  var rhs = leftPadZeros(y, maxLength);
  return lhs < rhs; // lexicographical comparison
};

const ge = (lhs, rhs) => {
  return !lt(lhs, rhs);
};

const gt = (lhs, rhs) => {
  if (eq(lhs, rhs)) return false;
  return ge(lhs, rhs);
};

const eq = (lhs, rhs) => {
  return normalize(lhs) === normalize(rhs);
}

const lt = (lhs, rhs) => {
  if (isNegative(lhs) && isPositive(rhs)) {
    return true;
  } else if (isPositive(lhs) && isNegative(rhs)) {
    return false;
  } else if (isNegative(lhs) && isNegative(rhs)) {
    // Example: -3 < -5
    return !ltPositive(abs(lhs), abs(rhs));
  } else {
    return ltPositive(lhs, rhs);
  }
};

module.exports = {
  ltPositive,
  lt,
  ge,
  gt,
  eq
};