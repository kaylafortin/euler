import { template } from '../helpers/template.js';
import { getPrimes, getSmallestFactor } from '../helpers/utils.js';

/**
 * It was proposed by Christian Goldbach that every odd composite number
 * can be written as the sum of a prime and twice a square.

 9 = 7 + 2×12
 15 = 7 + 2×22
 21 = 3 + 2×32
 25 = 7 + 2×32
 27 = 19 + 2×22
 33 = 31 + 2×12

 It turns out that the conjecture was false.

 What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
 */

const TEST_ANSWER = 0;
const TEST_ARGS = {
    max: 50,
}
const ARGS = {
    max: 10000
}


const getIsComposite = n => {
    const smallestFactor = getSmallestFactor(n)
    return !!smallestFactor && smallestFactor !== n
}


const solution = ({ max }) => {
    let count = 1;
    const primeList = getPrimes(max)
    const twiceSquareArr = []
    const twiceSquareObj = {}
    let answer = 0;

    const getTwiceSquareArr = (n, prime) => {
        const diff = n - prime;
        if (twiceSquareObj[diff]) return twiceSquareObj[diff];
        // no valid diff found
        if (diff < twiceSquareArr[twiceSquareArr.length - 1]) return null

        const nextN = twiceSquareArr.length + 1
        const nextVal = 2 * ((nextN) ** 2);
        twiceSquareObj[nextVal] = nextN;
        twiceSquareArr.push(nextVal);
        return getTwiceSquareArr(n, prime)
    }

    while (!answer && count < max) {
        //step1 - is composite
        if (getIsComposite(count)) {
            // step 2 - primes - primes must be less than n - 2
            for (let i = 0; i < primeList.length; i++) {
                const prime = primeList[i];
                if (prime > count - 2) {
                    answer = count
                    break
                }
                // found square value that satisfies equation
                if (!!getTwiceSquareArr(count, prime)) {

                    break
                }
            }
        }
        // count by 2 to ensure we are always testing odd numbers
        count += 2
    }

    return answer
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)