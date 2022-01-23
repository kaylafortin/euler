import { template } from '../helpers/template.js';
import { buildPermutations } from '../helpers/combinations.js';
import { getArraySum } from '../helpers/utils.js';

/**
 * We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once;
 * for example, the 5-digit number, 15234, is 1 through 5 pandigital.

 The product 7254 is unusual, as the identity, 39 × 186 = 7254,
 containing multiplicand, multiplier, and product is 1 through 9 pandigital.

 Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.

 HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.
 */

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const ARGS = {
    digits: DIGITS
}

const buildNumber = (digitArr) => Number(digitArr.join(''))

const solution = ({ digits }) => {
    const answer = []

    for (let i = 1; i < digits.length - 1; i++) {
        const possibleProducts = buildPermutations(digits, i)

        const products = possibleProducts.reduce((acc, product) => {
            const prodNum = buildNumber(product)
            const remainingNumbers = digits.filter((d) => !product.includes(d))
            const multiplierOptions = [];
            for (let k = 1; k <= remainingNumbers.length - 1; k++) {
                const multiplierPermutations = buildPermutations(remainingNumbers, k)
                multiplierOptions.push(...multiplierPermutations)
            }
            for (let j = 0; j < multiplierOptions.length; j++) {
                const multiplierPair = remainingNumbers.filter(d => !multiplierOptions[j].includes(d))
                if (buildNumber(multiplierPair) * buildNumber(multiplierOptions[j]) === prodNum) {
                    acc.push(prodNum);
                    break;
                }
            }
            return acc;
        }, [])
        answer.push(...products)
    }
    return getArraySum(answer);
}


template(ARGS, null, null, solution)