import { template } from '../helpers/template.js';
import { getDigitsOfNumberSum } from '../helpers/utils.js';

/**
 *A googol (10 **100) is a massive number: one followed by one-hundred zeros;
 * 100 **100 is almost unimaginably large: one followed by two-hundred zeros.
 * Despite their size, the sum of the digits in each number is only 1.

 Considering natural numbers of the form, ab, where a, b < 100, what is the maximum digital sum?
 */

const ARGS = {
    max: 100
}

const solution = ({ max }) => {
    let maxSum = 0;
    for (let a = 1; a < max; a++) {
        for (let b = 1; b < max; b++) {
            const num = BigInt(a) ** BigInt(b);
            const sumOfDigits = getDigitsOfNumberSum(num);

            if (sumOfDigits > maxSum) {
                maxSum = sumOfDigits;
            }
        }
    }
    return maxSum
}

template(ARGS, {}, null, solution)