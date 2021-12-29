import { template } from '../helpers/template.js';
import { getArraySum, getPrimes } from '../helpers/utils.js';

/**
 * The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
 * Find the sum of all the primes below two million.
 */

const TEST_ANSWER = 17;
const TEST_ARGS = {
    max: 10,
}
const ARGS = { max: 2000000 };

const solution = ({ max }) => {
    const primes = getPrimes(1, max);
    return getArraySum(primes)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)