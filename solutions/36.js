import { template } from '../helpers/template.js';
import { getArraySum, isPalindrome } from '../helpers/utils.js';

/**
 * The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.

 Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

 (Please note that the palindromic number, in either base, may not include leading zeros.)
 */

const TEST_ANSWER = 585
const TEST_ARGS = {
    min: 580,
    max: 600,
}
const ARGS = {
    min: 0,
    max: 1000000
}

const convertToBinary = (dec) => (dec >>> 0).toString(2);

const solution = ({ min, max }) => {
    const answer = [];
    for (let i = min; i < max; i++) {
        if (!isPalindrome(i)) continue;
        const binary = convertToBinary(i);
        if (isPalindrome(binary)) {
            answer.push(i)
        }
    }
    return getArraySum(answer)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)