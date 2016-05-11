# phibase
Node.js module for number conversion to/from [phi-based numeral system](https://en.wikipedia.org/wiki/Golden_ratio_base).

### Installation

> npm install phibase 

Then you can **require** it as npm module, or just include in your page via script tag (it will be exported as **window.PhiBase**).

### Documentation

#### PhiBase.R

Utility class for rational numbers.

#### PhiBase.R5

Utility class for numbers of kind **a + b√5**, where **a** and **b** are instances of **R**.

#### PhiBase.toPhiBase(Number | R | R5) => String

Converts number to its phi-based representation. For floating point JS number it will throw error, please use **R** class for rational numbers.

#### PhiBase.fromPhiBase(String) => R5

Computes R5 value of given phi-based representation. Use **.valueOf** method to get plain JS number.

#### PhiBase.noConflict() => PhiBase

Browser-only method which restores original value of **PhiBase** variable and returns module object.

### Examples

```js
var PhiBase = require("phibase");
var fromPhiBase = PhiBase.fromPhiBase,
	toPhiBase = PhiBase.toPhiBase,
	R = PhiBase.R,
	R5 = PhiBase.R5;

console.log(toPhiBase(1)); // "1"
console.log(toPhiBase(2)); // "10.01"
console.log(toPhiBase(10)); // "10100.0101"

var oneThird = R(1, 3);
console.log(toPhiBase(oneThird)) // "0.(00101000)"

var minusTwoAndHalf = fromPhiBase("-10.10100(001)");
console.log(minusTwoAndHalf.toString()); // "-5/2"
console.log(minusTwoAndHalf.valueOf()); // -2.5

var phi = R5(1, 1).div(2);
console.log(phi.toString()); // "1/2+1/2√5"
console.log(phi.valueOf()); // 1.618033988749895
```
