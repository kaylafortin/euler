import { template } from '../helpers/template.js';

/**
 * If the numbers 1 to 5 are written out in words: one, two, three, four, five,
 * then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

 If all the numbers from 1 to 1000 (one thousand)
 inclusive were written out in words, how many letters would be used?


 NOTE: Do not count spaces or hyphens.
 For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters.
 The use of "and" when writing out numbers is in compliance with British usage.
 */

const TEST_ANSWER = 19;
const TEST_ARGS = {
    min: 1,
    max: 5,
};

const ARGS = {
    min: 1,
    max: 1000,
};

const ONE_TO_TEN = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    18: 'eighteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
}

const TEEN = 'teen';
const AND = 'and';
const HUNDRED = 'hundred';
const THOUSAND = 'thousand';

const getNumberBase = (num) => {
    if (num > 999) return THOUSAND
    if (num > 99) return HUNDRED
    if (num > 12 && num < 20) return TEEN
    return ''
}


const getString = (num) => `${num}`;
const getBase = (num, digits) => Number(getString(num).substring(0, 1)) * digits
const getRemainder = (num, base) => num % base;
const getLength = (str) => str.replace(' ', '').length;

const getRemainderString = (num, base, remainder) => {
    if (num < 20) return TEEN;
    const baseString = getNumberBase(num);
    const remainderString = !!remainder && num > 99 ? AND : '';
    return ONE_TO_TEN[base] + baseString + remainderString;
}

const getBaseAndRemainder = (num, cutOff) => {
    const base = getBase(num, num < 100 ? 10 : 1);
    const remainder = getRemainder(num, cutOff);
    return { base, remainder }
}

const CUT_OFFS = [1000, 100, 10]

const buildString = (num, stringSum = '') => {
    let nextNum;
    const str = ONE_TO_TEN[num];
    if (str) {
        return stringSum + (str)
    }
    for (let i = 0; i < CUT_OFFS.length; i++) {
        if (num % CUT_OFFS[i] !== num) {
            const { remainder, base } = getBaseAndRemainder(num, CUT_OFFS[i]);
            const baseString = getRemainderString(num, base, remainder);
            stringSum += (baseString);
            nextNum = remainder !== 0 && remainder
            break
        }
    }
    return !!nextNum ? buildString(nextNum, stringSum) : stringSum
}


const getSum = (num) => {
    const str = buildString(num);
    return getLength(str)
}

const solution = ({ min, max }) => {
    let sum = 0;
    for (let i = min; i <= max; i++) {
        const numSum = getSum(i);
        sum += numSum
    }
    return sum
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)