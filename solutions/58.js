import { template } from '../helpers/template.js';
import { getPrimes, isPrime } from '../helpers/utils.js';
import Fraction from 'fraction.js';


/**
 * Starting with 1 and spiralling anticlockwise in the following way
 * a square spiral with side length 7 is formed.

 37 36 35 34 33 32 31
 38 17 16 15 14 13 30
 39 18  5  4  3 12 29
 40 19  6  1  2 11 28
 41 20  7  8  9 10 27
 42 21 22 23 24 25 26
 43 44 45 46 47 48 49

 It is interesting to note that the odd squares lie along the bottom right diagonal,
 but what is more interesting is that 8 out of the 13 numbers lying along both diagonals are prime;
 that is, a ratio of 8/13 ≈ 62%.

 If one complete new layer is wrapped around the spiral above,a square spiral with side length 9 will be formed.
 If this process is continued, what is the side length of the square spiral for which the ratio of primes
 along both diagonals first falls below 10%?
 */

const TEST_ANSWER = 5;

const TEST_ARGS = {
    limit: new Fraction(0.56),
}
const ARGS = {
    limit: new Fraction(1 / 10),
}

const getPrimesOnDiagonal = (spiralNumber) => {
    let primeCount = 0;
    const spaceBetweenDiagonals = spiralNumber - 1;
    if (spaceBetweenDiagonals <= 0) return 0
    const maxValueForSpiral = spiralNumber * spiralNumber
    for (let i = 0; i < 4; i++) {
        const cellValue = (maxValueForSpiral) - i * spaceBetweenDiagonals;
        // console.log(cellValue)
        if (isPrime(cellValue)) primeCount++
    }
    return primeCount;
}

const solution = ({ limit }) => {
    let width = 1;
    let primeRatio = 1;
    let numberOfPrimes = 0;
    let diagonalCount = 1;
    // const primes = getPrimes(10000)
    while (primeRatio > limit) {
        width += 2
        diagonalCount += 4
        numberOfPrimes += getPrimesOnDiagonal(width);
        primeRatio = numberOfPrimes > 0 ? new Fraction(numberOfPrimes, diagonalCount) : 0;
    }
    return width;
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)