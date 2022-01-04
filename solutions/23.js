import { template } from '../helpers/template.js';
import { getSumOfProperDivisors } from '../helpers/utils.js';

/**
 * A perfect number is a number for which the sum of its proper divisors is exactly equal to the number.
 * For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

 A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

 As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24.
 By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers.
 However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be
 expressed as the sum of two abundant numbers is less than this limit.

 Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
 */

export const TEST_ANSWER = 276
export const TEST_ARGS = {
    min: 1,
    max: 25
};

const ARGS = {
    min: 1,
    max: 28123
}

const getIsAbundant = num => {
    const sumOfDivisors = getSumOfProperDivisors(num);
    return sumOfDivisors > num;
}

const getBeSummed = (num, numArray, numObj) => {
    let canBeSummed = false
    for (let i = 0; i < numArray.length; i++) {
        const difference = num - numArray[i];
        if (difference <= 0) break
        if (numObj[difference]) {
            canBeSummed = true;
            break
        }
    }
    return canBeSummed;
}

const solution = ({ min, max }) => {
    const abundantArray = [];
    const abundantObject = {}
    let sum = 0;
    for (let i = min; i < max; i++) {
        if (getIsAbundant(i)) {
            abundantArray.push(i);
            abundantObject[i] = true;
        }
    }
    for (let i = min; i < max; i++) {
        if (!getBeSummed(i, abundantArray, abundantObject)) {
            sum += i
        }
    }

    return sum
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)

// run times:
// 28.835s
// 251.992ms
// 7.812s - whoops - object.keys() increased time
// 235.694ms