'use strict';
const {forceString} = require('../utils/type-check');
const {negate} = require('../utils/signs');
const { sum } = require('./sum');

module.exports = (a, b) => {
  forceString(a);
  forceString(b);
  return sum(a, negate(b));
};