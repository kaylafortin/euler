import { template } from '../helpers/template.js'
import { getArraySum } from '../helpers/utils.js';

/**
 * 2**15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

 What is the sum of the digits of the number 2**1000?
 */


const TEST_ANSWER = 26;
const TEST_ARGS = {
    power: 15,
    base: 2,
};

const ARGS = {
    power: 1000,
    base: 2
};

const EXPONENT_STRING = 'e+';

const getExponentPosition = (str) => str.indexOf(EXPONENT_STRING);

const hasExponent = (str) => getExponentPosition(str) >= 0

const getExponent = (str) => Number(str.substring(getExponentPosition(str) + EXPONENT_STRING.length))

const getPower = (str) => 10 ** getExponent(str);

const getWholeNumber = (str) => Number(str.substring(0, str.indexOf('.')))

const getCurrentTotal = (str) => getWholeNumber(str) * getPower(str);

const getSum = (str) => {
    const digitsArray = str.split('').map((item) => Number(item) || 0);
    return getArraySum(digitsArray);
}

const getSumLoop = (total, sum = 0) => {
    const totalAsString = total.toString()
    if (hasExponent(totalAsString)) {
        const firstDigit = getWholeNumber(totalAsString);
        const remainder = total - getCurrentTotal(totalAsString);
        const newSum = sum + firstDigit;
        return getSumLoop(remainder, newSum)
    }
    const newSum = getSum(totalAsString)
    return newSum + sum
}


const solution = ({ base, power }) => {
    const total = BigInt(base ** power);
    return getSumLoop(total);
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)