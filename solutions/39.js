import { template } from '../helpers/template.js';

/**
 * If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

 {20,48,52}, {24,45,51}, {30,40,50}

 For which value of p ≤ 1000, is the number of solutions maximised?
 */

const TEST_ANSWER = 120
const TEST_ARGS = {
    min: 115,
    max: 125,
}
const ARGS = {
    min: 0,
    max: 1000
}

const getC = (a, b) => Math.sqrt(a ** 2 + b ** 2)
const getIsValidP = (p, a, b, c) => a + b + c === p


const getMaxB = (p, a) => Math.floor((p - a) / 2) // not 100% if this is true

/**
 * solution Notes:
 * A <= B
 * C > A && C > B
 */

const solution = ({ min, max }) => {
    let maxP = 0
    let maxValues = 0
    for (let p = min; p <= max; p++) {
        let count = 0
        for (let a = 1; a < p / 2; a++) {
            const maxB = getMaxB(p, a)
            for (let b = a; b < maxB; b++) {
                const c = getC(a, b);
                if (getIsValidP(p, a, b, c)) {
                    count++
                    break;
                }
            }
        }
        if (count > maxValues) {
            maxP = p;
            maxValues = count
        }
    }
    return maxP
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)