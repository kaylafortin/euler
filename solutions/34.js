import { template } from '../helpers/template.js';
import { getArraySum, getDigitsOfNumber, getFactorial } from '../helpers/utils.js';

/**
 * 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

 Find the sum of all numbers which are equal to the sum of the factorial of their digits.

 Note: As 1! = 1 and 2! = 2 are not sums they are not included.
 */

const TEST_ANSWER = 145
const TEST_ARGS = {
    max: 200
}
const ARGS = {
    max: 1000000,
}

const getFactorialObject = (limit) => {
    const factorials = {};
    for (let i = 0; i < limit; i++) {
        factorials[i] = getFactorial(i)
    }
    return factorials
}

const solution = ({ max }) => {
    const answers = []
    const factorialObj = getFactorialObject(10)
    for (let j = 10; j < max; j++) {
        const digitsNum = getDigitsOfNumber(j);
        const isInvalid = digitsNum.some((d) => factorialObj[d] > j)
        if (isInvalid) continue;
        const factorialSum = digitsNum.reduce((acc, digit) => {
            acc += factorialObj[digit]
            return acc
        }, 0)
        if (factorialSum === j) answers.push(factorialSum)
    }
    return getArraySum(answers)
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)