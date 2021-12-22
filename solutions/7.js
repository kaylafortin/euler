import { template } from '../helpers/template.js'
import { isPrime } from '../helpers/utils.js';

/**
 * By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
 * we can see that the 6th prime is 13.
 * What is the 10 001st prime number?
 */

const ARGS = {
    index: 10001
}
const TEST_ARGS = {
    index: 6
}
const TEST_ANSWER = 13;

const getPrimes = (index) => {
    let primes = []
    let j = 1;
    while (primes.length < index) {
        if (isPrime(j, primes)) {
            primes.push(j);
        }
        j += 1
    }
    return primes
}

const solution = ({ index }) => {
    const primes = getPrimes(index);
    return primes[index - 1];
}


template(ARGS, TEST_ARGS, TEST_ANSWER, solution)
