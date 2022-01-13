require('should');

const { R, R5, toPhiBase, fromPhiBase } = require("./phibase");

const testN = 314;
const testR = R(32, 8);
const testR2 = R(355, 113);

const testR5 = R5(R(1, 2), R(1, 2));
const testR52 = R5(R(1, 3), R(1, 3));

const sumR5Nstr = '629/2+1/2√5';
const subR5Nstr = '-627/2+1/2√5';
const mulR5Nstr = '157+157√5';
const divR5Nstr = '1/628+1/628√5';

const strPhiN = '101010010100.010010000001';
const strN = '314';
const valN = 314;

const sumRR2 = '807/113';
const subRR2 = '97/113';
const mulRR2 = '1420/113';
const divRR2 = '452/355';

const strPhiTestR = '101.01';
const strTestR = '4';
const valTestR = '4';

const sumR5R52 = '5/6+5/6√5';
const subR5R52 = '1/6+1/6√5';
const mulR5R52 = '1+1/3√5';
const divR5R52 = '3/2';

const strPhiR5 = '10';
const strR5 = '1/2+1/2√5';
const valR5 = '1.618033988749895';

describe('N + R + R5', () => {
    let r;
    let resR5;

    describe('N', () => {
        describe('operations', () => {
            it('should add', () => {
                resR5 = testR5.add(testN);
                resR5.toString().should.be.equal(sumR5Nstr);
            });

            it('should sub', () => {
                resR5 = testR5.sub(testN);
                resR5.toString().should.be.equal(subR5Nstr);
            });

            it('should mul', () => {
                resR5 = testR5.mul(testN);
                resR5.toString().should.be.equal(mulR5Nstr);
            });

            it('should div', () => {
                resR5 = testR5.div(testN);
                resR5.toString().should.be.equal(divR5Nstr);
            });

            it('should eq', () => {
                resR5 = testR5.eq(testN);
                resR5.should.be.equal(false);
            });

            it('should gt', () => {
                resR5 = testR5.gt(testN);
                resR5.should.be.equal(false);
            });

            it('should gte', () => {
                resR5 = testR5.gte(testN);
                resR5.should.be.equal(false);
            });

            it('should lt', () => {
                resR5 = testR5.lt(testN);
                resR5.should.be.equal(true);
            });

            it('should lte', () => {
                resR5 = testR5.lte(testN);
                resR5.should.be.equal(true);
            });

            it('should toPhiBase', () => {
                resR5 = R(testN).toPhiBase();
                resR5.toString().should.be.equal(strPhiN);
            });

            it('should toString', () => {
                resR5 = R(testN).toString();
                resR5.toString().should.be.equal(strN);
            });

            it('should valueOf', () => {
                resR5 = R(testN).valueOf();
                resR5.should.be.equal(valN);
            });
        });
    });

    describe('R', () => {
        describe.skip('incorrect', () => {
            it('undefined', () => {
                r = R();
            });

            it('empty', () => {
                r = R('');
            });

            it('string', () => {
                r = R('phi');
            });

            it('float', () => {
                r = R(1.618);
            });
        });

        describe('correct', () => {
            it('integer', () => {
                r = R(1);
            });

            it('integer/integer', () => {
                r = R(355, 113);
            });
        });

        describe('operations', () => {
            it('should add', () => {
                resR5 = testR.add(testR2);
                resR5.toString().should.be.equal(sumRR2);
            });

            it('should sub', () => {
                resR5 = testR.sub(testR2);
                resR5.toString().should.be.equal(subRR2);
            });

            it('should mul', () => {
                resR5 = testR.mul(testR2);
                resR5.toString().should.be.equal(mulRR2);
            });

            it('should div', () => {
                resR5 = testR.div(testR2);
                resR5.toString().should.be.equal(divRR2);
            });

            it('should eq', () => {
                resR5 = testR.eq(testR2);
                resR5.should.be.equal(false);
            });

            it('should gt', () => {
                resR5 = testR.gt(testR2);
                resR5.should.be.equal(true);
            });

            it('should gte', () => {
                resR5 = testR.gte(testR2);
                resR5.should.be.equal(true);
            });

            it('should lt', () => {
                resR5 = testR.lt(testR2);
                resR5.should.be.equal(false);
            });

            it('should lte', () => {
                resR5 = testR.lte(testR2);
                resR5.should.be.equal(false);
            });

            it('should toPhiBase', () => {
                resR5 = testR.toPhiBase();
                resR5.toString().should.be.equal(strPhiTestR);
            });

            it('should toString', () => {
                resR5 = testR.toString();
                resR5.toString().should.be.equal(strTestR);
            });

            it('should valueOf', () => {
                resR5 = testR.valueOf();
                resR5.toString().should.be.equal(valTestR);
            });
        });
    });

    describe('R5', () => {
        describe.skip('incorrect', () => {
            it('undefined', () => {
                r = R5();
            });

            it('empty', () => {
                r = R5('');
            });

            it('string', () => {
                r = R5('phi');
            });

            it('float', () => {
                r = R5(1.618);
            });
        });

        describe('correct', () => {
            it('integer', () => {
                r = R5(1);
            });

            it('integer/integer', () => {
                r = R5(1, 1);
            });

            it('R', () => {
                r = R5(R(1, 1));
            });

            it('R/R', () => {
                r = R5(R(1, 2), R(1, 2));
            });
        });

        describe('operations', () => {
            it('should add', () => {
                resR5 = testR5.add(testR52);
                resR5.toString().should.be.equal(sumR5R52);
            });

            it('should sub', () => {
                resR5 = testR5.sub(testR52);
                resR5.toString().should.be.equal(subR5R52);
            });

            it('should mul', () => {
                resR5 = testR5.mul(testR52);
                resR5.toString().should.be.equal(mulR5R52);
            });

            it('should div', () => {
                resR5 = testR5.div(testR52);
                resR5.toString().should.be.equal(divR5R52);
            });

            it('should eq', () => {
                resR5 = testR5.eq(testR52);
                resR5.should.be.equal(false);
            });

            it('should gt', () => {
                resR5 = testR5.gt(testR52);
                resR5.should.be.equal(true);
            });

            it('should gte', () => {
                resR5 = testR5.gte(testR52);
                resR5.should.be.equal(true);
            });

            it('should lt', () => {
                resR5 = testR5.lt(testR52);
                resR5.should.be.equal(false);
            });

            it('should lte', () => {
                resR5 = testR5.lte(testR52);
                resR5.should.be.equal(false);
            });

            it('should toPhiBase', () => {
                resR5 = testR5.toPhiBase();
                resR5.toString().should.be.equal(strPhiR5);
            });

            it('should toString', () => {
                resR5 = testR5.toString();
                resR5.toString().should.be.equal(strR5);
            });

            it('should valueOf', () => {
                resR5 = testR5.valueOf();
                resR5.toString().should.be.equal(valR5);
            });
        });
    });
});
