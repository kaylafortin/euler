import { template } from '../helpers/template.js';

/**
 * A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

 a2 + b2 = c2
 For example, 3**2 + 4**2 = 9 + 16 = 25 = 5**2.

 There exists exactly one Pythagorean triplet for which a + b + c = 1000.
 Find the product abc.
 */

const TEST_ANSWER = 3 * 4 * 5;
const TEST_ARGS = {
    total: 12,
}
const ARGS = { total: 1000 };

const getSorted = (arg1, arg2, arg3) => [arg1, arg2, arg3].sort((a, b) => a - b)


const getAreAllUnique = (arg1, arg2, arg3) => {
    const newSet = [...new Set([arg1, arg2, arg3])];
    return newSet.length === 3
}

const getIsTriplet = (arg1, arg2, arg3) => {
    if (!getAreAllUnique(arg1, arg2, arg3)) return false;
    const [a, b, c] = getSorted(arg1, arg2, arg3);
    return a ** 2 + b ** 2 === c ** 2
}
const getTotal = (a, b, c) => a + b + c;
const getIsEqualTotal = (actTotal, total) => actTotal === total;
const getIsAbove = (actTotal, total) => actTotal > actTotal;
const getIsWhole = (c) => c % 1 === 0

const getC = (a, b) => Math.sqrt(a ** 2 + b ** 2);

const solution = ({ total }) => {
    let answer;
    for (let a = 1; a < total - 3; a++) {
        for (let b = a + 1; b < total - 3; b++) {
            const c = getC(a, b);
            const actTotal = getTotal(a, b, c)

            if (getIsWhole(c) && getIsEqualTotal(actTotal, total)) {
                if (getIsTriplet(a, b, c)) {
                    answer = a * b * c;
                    break
                }
            }
            if (getIsAbove(actTotal, total)) {
                break;
            }
        }
        if (answer) {
            break;
        }
    }
    return answer
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)