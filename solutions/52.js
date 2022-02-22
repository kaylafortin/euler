import { template } from '../helpers/template.js';

/**
 * It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.

 Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.
 */

const TEST_ANSWER = 125874
const TEST_ARGS = {
    multiples: [2],
}
const ARGS = {
    multiples: [2, 3, 4, 5, 6],
}

const doesMultipleMatch = (num, multiple) => {
    let multipleString = (num * multiple).toString();
    const numString = num.toString();
    if (numString.length !== multipleString.length) return false;
    for (let i = 0; i < numString.length; i++) {
        const digit = numString[i];
        const firstIndex = multipleString.indexOf(digit);
        if (firstIndex < 0) {
            return false;
        }
        multipleString = multipleString.slice(0, firstIndex) + multipleString.slice(firstIndex + 1)
    }
    return multipleString.length === 0
}

const solution = ({ multiples }) => {
    let answer = 0;
    let num = 10000;
    while (!answer) {
        let isAnswerFound = true
        for (let i = multiples.length - 1; i >= 0; i--) {
            isAnswerFound = doesMultipleMatch(num, multiples[i]);
            if (!isAnswerFound) break;
        }
        if (isAnswerFound) answer = num
        num++
    }
    return answer
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)