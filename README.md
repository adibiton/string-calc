### string-calc – a JavaScript library for string-encoded integers

Getting Started
```
npm i string-cal -S
```

Then, call from your file:

```javascript
const stringCalc = require('string-calc');

console.log(stringCalc.mul("3403","3232345")  // "10999670035"
```

This library lets you work with arbitrarily large integers, by storing them in strings.
The focus has been on ease of understanding, not on performance.
This library should still be useful for applications where performance isn’t critical,
but you need to work with large integers.

The following operations are available:

* `lt(x, y)`: is x < y (“less than”)?
* `le(x, y)`: is x ≤ y (“less or equal”)?
* `gt(x, y)`: is x > y (“greater than”)?
* `ge(x, y)`: is x ≥ y (“greater or equal”)?
* `eq(x, y)`: is x = y (“equals”)?
* `add(x, y)`
* `sub(x, y)`
* `mul(x, y)`
* `div(x, y)`
* `abs(x)`
* `isNegative(x)`
* `isPositive(x)`
* `negate(x)`