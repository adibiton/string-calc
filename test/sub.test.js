'use strict';
const sub = require('../lib/sub');

test('1 - 4 to equal -3', () =>{
  expect(sub('1','4')).toBe('-3');
});

test('1 - 0 to equal 1', () =>{
  expect(sub('1','0')).toBe('1');
});

test('23456789123456789123456789 - 1 to equal 23456789123456789123456788', () =>{
  expect(sub('23456789123456789123456789','1')).toBe('23456789123456789123456788');
});

test('-23456789123456789123456789 - 1 to equal -23456789123456789123456788', () =>{
  expect(sub('-23456789123456789123456789','-1')).toBe('-23456789123456789123456788');
});

test('-2 - (-2) to equal 0', () =>{
  expect(sub("-2", "-2")).toBe("0");
});

test('2 - (-2) to equal 0', () =>{
  expect(sub("2", "-2")).toBe("4");
});

test('-5 - 4 to equal -9', () =>{
  expect(sub("-5", "4")).toBe("-9");
});

test('-5 - (-6) to equal 1', () =>{
  expect(sub("-5", "-6")).toBe("1");
});