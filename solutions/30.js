import { template } from '../helpers/template.js';
import {
    getMaxForNumDigits, getArraySum, getDigitsOfNumber,
} from '../helpers/utils.js';
import { buildCombinationRepetition } from '../helpers/combinations.js';


/**
 *
 * Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

 1634 = 1**4 + 6**4 + 3**4 + 4**4
 8208 = 8**4 + 2**4 + 0**4 + 8**4
 9474 = 9**4 + 4**4 + 7**4 + 4**4
 As 1 = 1**4 is not a sum it is not included.

 The sum of these numbers is 1634 + 8208 + 9474 = 19316.

 Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
 */


const TEST_ANSWER = 19316;

const TEST_ARGS = {
    power: 4,
}
const ARGS = {
    power: 5,
}

// sum cannot be greater than number of digits

// get max total for digits and then subtract
// 9 = 4 9999 - 6561
// 9 can only be used with 4 digits
// 2 has min 2

const getNumberOfDigits = (num) => num.toString().length


// create sums only options that respect this rule
const getOptions = ({ power }) => {
    const options = {};
    for (let i = 0; i <= 9; i++) {
        options[i] = i ** power
    }
    return options
}

const getNumberArray = ({ power }) => {
    const optionsObj = getOptions({ power });
    return Object.keys(optionsObj)
}

// removes the digits as we go to prevent duplicates from matching
const checkDigits = (digitArr, combinationIndexArr) => {
    for (let i = 0; i < digitArr.length; i++) {
        const digit = digitArr[i]
        const index = combinationIndexArr.indexOf(digit.toString());
        if (index >= 0) {
            combinationIndexArr.splice(index, 1)
        }
    }
    return combinationIndexArr.length === 0
}

const checkSum = (combinationIndexArr, options) => {
    const numbersArr = combinationIndexArr.map((elm) => options[elm])
    const sum = getArraySum(numbersArr)
    const numDigits = combinationIndexArr.length;
    const digits = getDigitsOfNumber(sum);
    if (digits.length !== numDigits) return 0;
    if (sum === 0) return 0
    return checkDigits(digits, combinationIndexArr) ? sum : 0
}

const getSumsForDigits = ({ numDigits, options, indexArray }) => {
    const max = Number(getMaxForNumDigits(numDigits + 1));
    const elms = indexArray.filter((index) => Number(options[index]) <= max);
    const combinations = buildCombinationRepetition(elms, numDigits)

    return combinations.reduce((acc, combination) => {
        const sum = checkSum([...combination], options);
        if (!!sum) {
            acc.push(sum)
        }
        return acc
    }, [])
}

// find the point at which the final sum has more digits than the sum can have
const getMaxDigits = ({ power }) => {
    let isMax = false;
    let numDigits = 1;
    const maxPower = 9 ** power;
    while (!isMax) {
        const max = maxPower * numDigits;
        if (getNumberOfDigits(max) < numDigits) {
            isMax = true;
        } else {
            numDigits++
        }
    }
    return numDigits
}

const solution = ({ power }) => {
    let answers = []
    const options = getOptions({ power });
    const indexArray = getNumberArray({ power })
    const maxDigits = getMaxDigits({ power });
    // start at 2 since we need two digits to have a sum
    for (let numDigits = 2; numDigits < maxDigits; numDigits++) {
        const sums = getSumsForDigits({ numDigits, options, indexArray })
        if (sums.length) {
            answers.push(...sums)
        }
    }
    return getArraySum(answers)
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)