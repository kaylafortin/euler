import { getAllPrimeFactors } from '../helpers/utils.js';
import { template } from '../helpers/template.js'

/**
 *
 * 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
 * What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
 */

const TEST_ARGS = { min: 1, max: 10 };
const ARGS = { min: 1, max: 20 };
const TEST_ANSWER = 2520;
// const CORRECT_ANSWER = 232792560;


const localAcc = (acc, factor) => {
    const count = acc[factor];
    if (!count) {
        acc[factor] = 1;
        return acc;
    }
    acc[factor] = count + 1;
    return acc
}
const getFactorACC = (allFactors) =>
    allFactors.reduce((acc, factors) => {
        const count = factors.reduce((facAcc, factor) => {
            const local = localAcc(facAcc, factor);
            if (!acc[factor] || local[factor] > acc[factor]) {
                acc[factor] = local[factor];
            }
            return local
        }, {})
        return acc;
    }, {})

const getExponentOfObject = (obj) =>
    Object.keys(obj).reduce((acc, key) => {
        const val = Number(key) ** Number(obj[key]);
        return acc * val;
    }, 1)


const solution = ({ min, max }) => {
    let allFactors = [];
    for (let i = max; i >= min; i--) {
        if (i > 1) {
            const factors = getAllPrimeFactors(i)
            allFactors.push(factors)
        }
    }
    const factorAcc = getFactorACC(allFactors);
    return getExponentOfObject(factorAcc)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)