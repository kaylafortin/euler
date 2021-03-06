import { template } from '../helpers/template.js';
import { getPentagonalValue } from '../helpers/shapes.js';

/**
 * Pentagonal numbers are generated by the formula, Pn=n(3nā1)/2.
 * The first ten pentagonal numbers are:

 1, 5, 12, 22, 35, 51, 70, 92, 117, 145, ...

 It can be seen that P4 + P7 = 22 + 70 = 92 = P8.
 However, their difference, 70 ā 22 = 48, is not pentagonal.

 Find the pair of pentagonal numbers, Pj and Pk,
 for which their sum and difference are pentagonal and D = |Pk ā Pj|
 is minimised; what is the value of D?
 */

const TEST_ANSWER = null

const TEST_ARGS = {}
const ARGS = {}

const solution = () => {
    const pentagonalArr = []
    const pentagonalObj = {}
    let totalPDiff = undefined
    let count = 1;

    const getLocalPentagonalValue = (n) => {
        if (!!pentagonalArr[n - 1]) {
            return pentagonalArr[n - 1]
        }
        const p = getPentagonalValue(n);
        pentagonalObj[p] = n;
        pentagonalArr.push(p)
        return p
    }

    const getIsPentagonal = (num, lastPValue) => {
        const startingPValue = lastPValue || pentagonalArr[pentagonalArr.length - 1];
        if (num < startingPValue) {
            return !!pentagonalObj[num]
        }
        const n = pentagonalArr.length + 1;
        const p = getLocalPentagonalValue(n)
        return getIsPentagonal(num, p)
    }

    const checkNextNValue = (n) => {
        const p = getLocalPentagonalValue(n);
        for (let k = pentagonalArr.length - 1; k >= 0; k--) {
            const p2 = pentagonalArr[k]
            const pDiff = p > p2 ? p - p2 : p2 - p;
            const sum = p2 + p;
            if (getIsPentagonal(pDiff)) {
                if (getIsPentagonal(sum)) {
                    totalPDiff = pDiff
                }
            }
        }
    }

    while (!totalPDiff) {
        checkNextNValue(count)
        count++
    }

    return totalPDiff
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)