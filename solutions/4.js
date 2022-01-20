import { template } from '../helpers/template.js';

/**
 * A palindromic number reads the same both ways.
 * The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
 * Find the largest palindrome made from the product of two 3-digit numbers.
 */

const TEST_ANSWER = 9009;

const ARGS = {
    digits: 3,
}
const TESTING_ARGS = {
    digits: 2,
}


const isPalidrome = (val) => {
    const valString = val.toString();
    const legnth = valString.length - 1;
    const lengthStringHalf = Math.floor(valString.length / 2)
    let isGood = true;
    for (let i = 0; i < lengthStringHalf; i++) {
        if (!isGood) return;
        if (valString[legnth - i] !== valString[i]) {
            isGood = false;
        }
    }
    return isGood;
}

const solution = ({ digits }) => {
    let palidromes = [];
    const base = 10 ** digits - 1
    const num1 = base
    const num2 = base

    let total = 0
    let itteration1 = 0
    let itteration2 = 0
    let foundPali = false

    let keepGoing = true
    while (keepGoing) {
        const num12 = num1 - itteration1
        const num22 = num2 - itteration2
        total = num12 * num22
        foundPali = isPalidrome(total);
        if (foundPali) {
            palidromes.push(total);
            itteration2 += 1
            itteration1 = 0
        } else {
            if (itteration1 < base - 1) {
                itteration1 += 1
            } else {
                itteration2 += 1
                itteration1 = 0
            }
        }
        if (itteration2 > 50) keepGoing = false
    }
    return Math.max(...palidromes);
}

template(ARGS, TESTING_ARGS, TEST_ANSWER, solution)

// console.log(num1, num2, total)