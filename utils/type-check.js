'use strict';
const forceString = (value) => {
  forceType(value, 'string');
};

const forceNumber = (value) => {
  forceType(value, 'number');
};
const forceNonNegativeNumber = (value) => {
  forceType(value, 'number');
  if (value < 0) {
    throw new Error('Expected a positive number: ' + value);
  }
};
const forceCondition = (value, condition, conditionName) => {
  if (!condition.call(null, value)) {
    throw new Error('Condition ' + conditionName + ' failed for value ' + value);
  }
};
const forceType = (value, type) => {
  if (typeof value !== type) {
    throw new Error('Not a ' + type + ': ' + value);
  }
};

module.exports = {
  forceNumber,
  forceString,
  forceNonNegativeNumber,
  forceCondition,
  forceType,
};
