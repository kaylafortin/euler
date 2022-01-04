import { template } from '../helpers/template.js';
import { getAllFactorPairs, getArraySum, getDigitsOfNumberSum, getFactorial } from '../helpers/utils.js';

/**
 * Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
 If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

 For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284.
 The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

 Evaluate the sum of all the amicable numbers under 10000.
 */

export const TEST_ANSWER = 284 + 220;
export const TEST_ARGS = {
    min: 219,
    max: 285
};

const ARGS = {
    min: 1,
    max: 10000
}

const IS_PROPER = true;

const getSumOfDivisors = (num) => {
    const divisorArray = getAllFactorPairs(num, IS_PROPER);
    return getArraySum(divisorArray)
}

const solution = ({ min, max }) => {
    const divisors = {}
    const answers = []
    for (let num = min; num < max; num++) {
        if (divisors[num]) continue
        const sum = getSumOfDivisors(num);
        divisors[num] = sum
        if (!divisors[sum]) {
            divisors[sum] = getSumOfDivisors(sum);
        }
        if (divisors[sum] === num && sum !== num) {
            answers.push(sum, num)
        }
    }
    return getArraySum(answers)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)