import { template } from '../helpers/template.js';
import { getAllFactorPairs } from '../helpers/utils.js';

/**
 * The sequence of triangle numbers is generated by adding the natural numbers.
 * So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

 Let us list the factors of the first seven triangle numbers:

 1: 1
 3: 1,3
 6: 1,2,3,6
 10: 1,2,5,10
 15: 1,3,5,15
 21: 1,3,7,21
 28: 1,2,4,7,14,28
 We can see that 28 is the first triangle number to have over five divisors.

 What is the value of the first triangle number to have over five hundred divisors?
 */

const TEST_ANSWER = 28;
const TEST_ARGS = {
    divisors: 5,
};
const ARGS = {
    divisors: 500
};

const getTriangle = (sum, num) => num + sum;

const solution = ({ divisors }) => {
    let counter = 1;
    let sum = 0;
    let answer;
    while (!answer) {
        sum = getTriangle(sum, counter);
        const uniqueFactors = getAllFactorPairs(sum);
        if (uniqueFactors.length > divisors) {
            answer = sum;
        }
        counter += 1
    }
    return answer
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)