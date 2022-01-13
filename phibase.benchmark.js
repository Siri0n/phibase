const Benchmark = require('benchmark');
const { R, R5, toPhiBase, fromPhiBase } = require("./phibase");

const suite = new Benchmark.Suite;
let count;
let count2;

const phi = (Math.sqrt(5) + 1) / 2;
const maxS = Math.pow(phi, 25);
const minS = 0.000000001;

function toPhi(num) {
    let res = '';
    let s = maxS;
    let n = 25;

     while(num > minS && s > minS) {
         if (s - num < minS) {
             num -= s;
             res += '1';
         } else {
             res += '0';
         }
         s /= phi;
         if (n === 0) {
             res += '.';
         }
         n -= 1;
     }

     return res;
}

// add tests
suite
.add('toPhiBase', function () {
    const arg = new R(count);
    const res = arg.toPhiBase();

    count += 1;

    return res;
})
.add('toPhi', function () {
    const res = toPhi(count2);

    count2 += 1;

    return res;
})
// add listeners
.on('start', function (event) {
    count = 0;
    count2 = 0;
})
.on('cycle', function (event) {
    console.log(String(event.target));
    count = 0;
    count2 = 0;
})
.on('complete', function () {
    const sorted = this.sort((a, b) => b.compare(a));
    const fastest = sorted[0];
    const slowest = sorted[sorted.length - 1];
    const m = Math.log(fastest.hz / slowest.hz);
    for (let n = 0; n < sorted.length; n += 1) {
        const suite = sorted[n];
        const k = suite.hz / fastest.hz; // should be 1
        const lg = Math.log(suite.hz / slowest.hz) / m; // log fastest.hz / slowest.hz (suite.hz)
        const str = suite.toString();
        console.log(`${str} slower ${(100 * k).toFixed(2)}% log-scale ${lg.toFixed(2)}`);
    }
    console.log('Fastest is', fastest.name);
    console.log('Slowest is', slowest.name);
})
    //run async
    .run({ 'async': true });
