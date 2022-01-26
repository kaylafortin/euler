import { template } from '../helpers/template.js';
import { getAllPrimeFactors } from '../helpers/utils.js';

/**
 * The first two consecutive numbers to have two distinct prime factors are:

 14 = 2 × 7
 15 = 3 × 5

 The first three consecutive numbers to have three distinct prime factors are:

 644 = 2² × 7 × 23
 645 = 3 × 5 × 43
 646 = 2 × 17 × 19.

 Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
 */
const TEST_ANSWER = 644
const TEST_ARGS = {
    length: 3,
}
const ARGS = {
    length: 4
}

const getNumberOfDistinctPrimeFactors = (v) => {
    const factors = getAllPrimeFactors(v);
    // deduplicate
    return [...new Set(factors)].length
}

const solution = ({ length }) => {
    let answer = [];
    let count = 3;
    while (answer.length < length) {
        if (getNumberOfDistinctPrimeFactors(count) === length) {
            answer.push(count)
        } else {
            answer = [];
        }
        count += 1
    }
    return answer[0]
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)