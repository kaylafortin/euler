import { template } from '../helpers/template.js';
import { getPrimes, isPrime } from '../helpers/utils.js';

/**
 * Euler discovered the remarkable quadratic formula:

 It turns out that the formula will produce 40 primes for the consecutive integer values .
 However, when  is divisible by 41, and certainly when  is clearly divisible by 41.

 The incredible formula  was discovered, which produces 80 primes for the consecutive values .
 The product of the coefficients, −79 and 1601, is −126479.

 Find the product of the coefficients, for the quadratic expression that produces the maximum number of primes for consecutive values.
 */

const TEST_ANSWER = 41 // 1 * 41

const TEST_ARGS = {
    max: 45,
    min: 0,
}
const ARGS = {
    min: -1000,
    max: 1000,
}

const quadraticEquation = ({ a, b, n }) => n ** 2 + (n * a) + b

const checkIsResultPrime = ({ a, b, n }) => {
    const result = quadraticEquation({ a, b, n });
    return isPrime(result)
}

// assume N must be greater than 40 since 40 consecutive = 1 * 40
// assume max n must be less than 79 given our constraints
const getMaxValueForN = ({ max }) => max < 1600 ? 79 : 100

const getPossiblePrimeValues = ({ max }) => {
    const primeArray = getPrimes(max);
    const maxValueForN = getMaxValueForN({ max });
    const maxValueForB = primeArray[primeArray.length - 1];
    const maxPrimeResult = maxValueForN ** 2 + max * maxValueForN + maxValueForB;
    return getPrimes(maxPrimeResult);
}

// B must be prime to start with n = 0;
const getPossibleValuesForB = ({ min, max }) => {
    const primes = getPrimes(max);
    const negativeOptions = getPrimes(min * -1).map((elm) => elm * -1);
    return [...primes, ...negativeOptions];
}

const solveForA = ({ b, prime, n = 1 }) => (prime - n ** 2 - b) / n

// calculate based on n=0 for B & n=1 for A
const getPossibleValues = ({ max, min }) => {
    const valuesForB = getPossibleValuesForB({ min, max }) // n = 0 (min N)
    const valuesForP = getPossiblePrimeValues({ max }) // n = 78 (max N)
    return valuesForB.reduce((acc, b) => {
        const values = [];
        for (let i = 0; i < valuesForP.length; i++) {
            const a = solveForA({ b, prime: valuesForP[i], n: 1 }); // n = 1
            if (a < max && a > min) values.push(a);
            if (a >= max) break
        }
        acc[b] = values;
        return acc;
    }, {})
}

const getRemainingBValues = (valuesObj) => Object.keys(valuesObj).map(b => Number(b))

const solveForCoefficients = ({ valuesObj, n }) => {
    const newValuesForB = getRemainingBValues(valuesObj);

    if (newValuesForB.length === 1) {
        const b = newValuesForB[0];
        const a = valuesObj[b][0];
        return { a, b, n }
    }

    const nextValueForN = n + 1;

    const newValuesObj = newValuesForB.reduce((acc, b) => {
        const aValues = valuesObj[b];
        const validAValues = aValues?.filter((a) => checkIsResultPrime({ a, b, n: nextValueForN }));
        if (!!validAValues?.length) {
            acc[b] = validAValues;
        }
        return acc;
    }, {})

    return solveForCoefficients({ valuesObj: newValuesObj, n: nextValueForN });
}

const solution = ({ min, max }) => {
    const valuesObj = getPossibleValues({ min, max })
    // start with n = 2 since 0 & 1 were used to create values obj
    const { a, b, n } = solveForCoefficients({ valuesObj, n: 2 })
    console.log('a:', a, 'b:', b, 'n:', n)
    return a * b
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)