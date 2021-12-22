import { template } from '../helpers/template.js';
import { isPrime } from '../helpers/utils.js';

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
    let primes = []
    let sum = 0;
    let j = 1;
    while (j <= max) {
        if (isPrime(j, primes)) {
            primes.push(j);
            sum += j
        }
        j += 1
    }
    return sum
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)