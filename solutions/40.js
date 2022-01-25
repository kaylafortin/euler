import { template } from '../helpers/template.js';
import { getArrayProduct } from '../helpers/utils.js';

/**
 * An irrational decimal fraction is created by concatenating the positive integers:

 0.123456789101112131415161718192021...

 It can be seen that the 12th digit of the fractional part is 1.

 If dn represents the nth digit of the fractional part, find the value of the following expression.

 d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000
 */


const TEST_ANSWER = 2 * 8 * 2

const TEST_ARGS = {
    digits: [2, 8, 15]
}
const ARGS = {
    digits: [1, 10, 100, 1000, 10000, 100000, 1000000]
}

// each number has 2 digits. starts at the 10th digit
// if odd - second part of digit. if even first part.

// for 100: 10 - 99 have 2 digits each
// for 1-9: 1 digit each
// for 1000 - 100 - 999 = 3 digits each
const getRange = (length) => {
    let max = 0;
    let min = 0;
    let count = 1
    while (count <= length) {
        min = max;
        max = min + ((10 ** count - 1) - (10 ** (count - 1) - 1)) * count;
        count++
    }
    return {
        max,
        min,
        length: count - 1
    }
}

const findPlace = (d, range) => {
    if (d < 10) return d;
    const remainder = (d - (range.min + 1))
    const digitIndex = remainder % range.length;
    const value = Math.floor(remainder / range.length) + 10 ** (range.length - 1)
    const valString = value.toString()
    return valString[digitIndex];
}

const solution = ({ digits }) => {
    const solution = []
    for (let i = 0; i < digits.length; i++) {
        const d = digits[i];
        let count = 1;
        let range = { max: 0, min: 0 };
        while (range.max < d) {
            range = getRange(count);
            count++
        }
        const integer = findPlace(d, range)
        solution.push(integer)
    }
    return getArrayProduct(solution)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)