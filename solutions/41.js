import { template } from '../helpers/template.js';
import { getDigitsOfNumber, getIsOdd, getPrimes, isPrime } from '../helpers/utils.js';

/**
 * We shall say that an n-digit number is pan-digital if it makes use of all the digits 1 to n exactly once.
 * For example, 2143 is a 4-digit pan-digital and is also prime.

 What is the largest n-digit pan-digital prime that exists?
 */



const TEST_ANSWER = 2143

const TEST_ARGS = {
    limit: 2150,
}
// does work with 987654321 (using smaller limit for testing post-solving)
const ARGS = {
    limit: 87654321
}

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const getIsPanDigital = (num) => {
    const numString = num.toString()
    for (let i = 0; i < numString.length; i++) {
        if (numString.indexOf(DIGITS[i]) < 0) {
            return false
        }
    }
    return true
}

const solution = ({ limit }) => {
    let answer;
    // descend by 2 and start with odd number since primes can only be odd
    for (let i = getIsOdd(limit) ? limit : limit - 1; i > 0; i -= 2) {
        if (getIsPanDigital(i)) {
            if (isPrime(i)) {
                answer = i
                break;
            }
        }
    }
    return answer
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)