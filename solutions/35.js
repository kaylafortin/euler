import { template } from '../helpers/template.js';
import { buildNumberFromDigits, getDigitsOfNumber, getPrimes, isPrime } from '../helpers/utils.js';

/**
 * The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

 There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

 How many circular primes are there below one million?
 */
const TEST_ANSWER = 13
const TEST_ARGS = {
    limit: 100
}
const ARGS = {
    limit: 1000000
}

const buildCircular = (digits) => {
    const [firstDigit, ...remainingDigits] = digits;
    return [...remainingDigits, firstDigit]
};

const buildAllCirculars = (num) => {
    const digits = getDigitsOfNumber(num);
    const circulars = [digits]
    for (let i = 0; i < digits.length - 1; i++) {
        const nextNum = buildCircular(circulars[i]);
        circulars.push(nextNum)
    }
    return circulars
}
const checkIsPrimeCircular = (prime, primes) => {
    const circulars = buildAllCirculars(prime);
    return !circulars.some((digits) => {
        const num = buildNumberFromDigits(digits)
        return !isPrime(num, primes)
    })
}

const solution = ({ limit, start }) => {
    const answer = []
    const primesList = getPrimes(limit);
    for (let i = 0; i < primesList.length; i++) {
        const isCircular = checkIsPrimeCircular(primesList[i], primesList)
        if (isCircular) answer.push(primesList[i])
    }
    return answer.length
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)