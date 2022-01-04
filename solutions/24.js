import { template } from '../helpers/template.js';
import { getFactorial } from '../helpers/utils.js';

/**
 * A permutation is an ordered arrangement of objects.
 * For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4.
 * If all of the permutations are listed numerically or alphabetically, we call it lexicographic order.
 * The lexicographic permutations of 0, 1 and 2 are:

 012   021   102   120   201   210

 What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
 */

/**
 *
 * create alphabetically
 * starting with 0 will always be lower
 * for 0 start there will be 1 - length perms since 0 is first. 362880 perms
 * so will not start with 0
 * with 1 starting will also be 362880 perms
 * millionth will start with 2
 * can start building with 2 and have the count at 362880 * 2
 * continue down chain by calculating next fixed
 * NOTE: assumes ordered digits - could ensure order by sorting first
 */

const TEST_ANSWER = '201';
const TEST_ARGS = {
    digits: [0, 1, 2],
    index: 5
};

const ARGS = {
    digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    index: 1000000
}

const convertToStringArray = (arr) => arr.map((num) => num.toString())
const createPermutationString = (arr) => arr.reduce((acc, str) => {
    acc += str;
    return acc
}, '')

const getStartingIndex = (digits, index) => {
    // num of combos that start with each digit
    const numberOfPermutations = getFactorial(digits.length - 1)
    let startingIndex = 0;
    for (let i = 1; i <= digits.length; i++) {
        if (i * numberOfPermutations >= index) {
            startingIndex = i - 1;
            break
        }
    }

    return ({
        startingIndex,
        startingSum: (startingIndex) * numberOfPermutations,
    })
}

const findLexicographicPermutation = (arr, index) => {
    const remainingArray = [...arr];
    let remainingIndex = index;
    const answer = [];
    while (remainingArray.length > 0) {
        const { startingIndex, startingSum } = getStartingIndex(remainingArray, remainingIndex);
        remainingIndex -= startingSum;
        // remove starting elm from array of options
        const [elm] = remainingArray.splice(startingIndex, 1)
        answer.push(elm);
    }
    return createPermutationString(answer)
}

const solution = ({ digits, index }) => {
    const arr = convertToStringArray(digits);
    return findLexicographicPermutation(arr, index);
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)