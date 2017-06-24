'use strict';
const { sum } = require('../lib/sum');

test('add 1 + 4 to equal 5', () =>{
  expect(sum('1','4')).toBe('5');
});

test('add 0 + 0 to equal 0', () =>{
  expect(sum('0','0')).toBe('0');
});

test('add 1 + 0 to equal 1', () =>{
  expect(sum('1','0')).toBe('1');
});

test('add 23456789123456789123456789 + 1 to equal 23456789123456789123456790', () =>{
  expect(sum('23456789123456789123456789','1')).toBe('23456789123456789123456790');
});

test('add -2 + (-2) to equal -2', () =>{
  expect(sum("-2", "-2")).toBe("-4");
});

test('add 2 + (-2) to equal 0', () =>{
  expect(sum("2", "-2")).toBe("0");
});

test('add -5 + 4 to equal -1', () =>{
  expect(sum("-5", "4")).toBe("-1");
});

test('add -5 + 6 to equal 1', () =>{
  expect(sum("-5", "6")).toBe("1");
});