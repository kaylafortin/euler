import { getLargestFactor, isPrime } from '../helpers/utils.js';
import { template } from '../helpers/template.js';

/**
 * The prime factors of 13195 are 5, 7, 13 and 29.
 * What is the largest prime factor of the number 600851475143 ?
 */

/**
 *
 * list of primes
 * divisible options
 */
const TEST_LIMIT = 13195;
const TEST_ANSWER = 29;
const LIMIT = 600851475143;

export const getNaturalPrimes = (limit) => {
    const largest = getLargestFactor(limit);
    if (isPrime(largest)) {
        return largest
    }
    if (largest === limit) {
        return largest
    }
    return getNaturalPrimes(largest)
}

const solution = ({ limit }) => getNaturalPrimes(limit);

template({ limit: LIMIT }, { limit: TEST_LIMIT }, TEST_ANSWER, solution)