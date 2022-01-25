import { template } from '../helpers/template.js';
import { getArraySum, getPrimes, isPrime } from '../helpers/utils.js';

/**
 * The number 3797 has an interesting property.
 * Being prime itself, it is possible to continuously remove digits from left to right
 * and remain prime at each stage: 3797, 797, 97, and 7.
 * Similarly we can work from right to left: 3797, 379, 37, and 3.

 Find the sum of the only eleven primes that are both truncatable from left to right and right to left.

 NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
 */


const TEST_ANSWER = 3797
const TEST_ARGS = {
    min: 3700,
    max: 4000,
    length: 1,
}
const ARGS = {
    min: 0,
    max: 1000000,
    length: 11,
}

const checkSubPrime = (subStr, primesList) =>
    isPrime(Number(subStr), primesList)


const getIsTruncatable = (prime, primesList) => {
    let isSubPrime = true
    const primeString = prime.toString()
    const stringLength = primeString.length;
    for (let i = 0; i < stringLength; i++) {
        const subStringRight = primeString.substring(i)
        if (!checkSubPrime(subStringRight, primesList)) {
            isSubPrime = false;
            break
        }
        const subStringLeft = primeString.substring(0, stringLength - i)
        if (!checkSubPrime(subStringLeft, primesList)) {
            isSubPrime = false;
            break
        }
    }
    return isSubPrime;
}

const solution = ({ length, min, max }) => {
    const answer = [];
    const primes = getPrimes(max);
    for (let i = 0; i < primes.length; i++) {
        const prime = primes[i];
        if (prime < 10 || prime < min) continue;
        const isTruncatable = getIsTruncatable(prime, primes);
        if (isTruncatable) {
            answer.push(prime)
        }
        if (answer.length === length) break;
    }
    return getArraySum(answer)
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)