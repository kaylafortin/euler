import { template } from '../helpers/template.js';
import { buildNumberFromDigits, getPrimes } from '../helpers/utils.js';

/**
 * The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330,
 * is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are
 * permutations of one another.

 There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property,
 but there is one other 4-digit increasing sequence.

 What 12-digit number do you form by concatenating the three terms in this sequence?

 */

const TEST_ANSWER = '148748178147'
const TEST_ARGS = {
    limit: 1,
}
const ARGS = {
    limit: 2,
}

const getPrimePermutations = (prime, list) => {
    return list.filter((v) => {
        let p = prime;
        for (let i = 0; i < v.length; i++) {
            const index = p.indexOf(v[i]);
            if (index < 0) {
                return false
            }
            p = [...p.slice(0, index), ...(index < p.length ? p.slice(index + 1, p.length) : [])]
        }
        return true
    }).map((v) => Number(v.join('')))
}

// prime must be a permutation
// difference must be equal
// primes are 4 digits
const solution = ({ limit }) => {
    const answers = [];
    // get 4 digit primes
    const primesDigits = getPrimes(10 ** 4 - 1).filter(v => v > 999).map((v) => v.toString().split(''))

    for (let i = 0; i < primesDigits.length; i++) {
        const prime = primesDigits[i];
        const primeNum = buildNumberFromDigits(prime)
        const permutations = getPrimePermutations(prime, primesDigits.slice(i + 1))
        for (let k = 0; k < permutations.length - 1; k++) {
            const diff = permutations[k] - primeNum;
            const next = permutations[k] + diff;
            if (permutations.includes(next)) {
                answers.push([primeNum, permutations[k], next])
            }
        }
        if (answers.length >= limit) break
    }

    return answers[limit - 1].join('')
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)