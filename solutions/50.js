import { template } from '../helpers/template.js';
import { getPrimes, isPrime } from '../helpers/utils.js';

/**
 * The prime 41, can be written as the sum of six consecutive primes:

 41 = 2 + 3 + 5 + 7 + 11 + 13
 This is the longest sum of consecutive primes that adds to a prime below one-hundred.

 The longest sum of consecutive primes below one-thousand that adds to a prime,
 contains 21 terms, and is equal to 953.

 Which prime, below one-million, can be written as the sum of the most consecutive primes?
 */

const TEST_ANSWER = 953
const TEST_ARGS = {
    max: 1000,
}
const ARGS = {
    max: 1000000,
}

const getNextSum = (index, primeList, sum = 0) => {
    const nextPrime = primeList[index];
    return sum + nextPrime
}

const getLength = (start, order = []) => {
    const endIndex = order[order.length - 1].index;
    return endIndex - start + 1;
}

const solution = ({ max }) => {
    let answer = 0;
    let count = 0

    const primesList = getPrimes(max);
    for (let i = 0; i < primesList.length; i++) {
        let sum = 0;
        let maxIndex = i;
        if (count > primesList.length - i) break
        for (let j = i; j < primesList.length; j++) {
            const nextSum = getNextSum(j, primesList, sum)
            if (nextSum > max) {
                break;
            }
            if (isPrime(nextSum, primesList)) {
                maxIndex = j
            }
            sum = nextSum;
        }
        const length = maxIndex - i + 1;
        if (length > count) {
            count = length
            answer = sum
        }

    }
    return answer

}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)