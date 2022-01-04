import { template } from '../helpers/template.js';
import { getDigitsOfNumberSum, getFactorial } from '../helpers/utils.js';

/**
 * n! means n × (n − 1) × ... × 3 × 2 × 1

 For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
 and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

 Find the sum of the digits in the number 100!
 */


export const TEST_ANSWER = 27;
export const TEST_ARGS = {
    factorial: 10,
};

const ARGS = {
    factorial: 100,
}

const solution = ({ factorial }) => {
    const sum = getFactorial(factorial);
    return getDigitsOfNumberSum(sum)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)