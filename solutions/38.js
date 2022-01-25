import { template } from '../helpers/template.js';
import { buildPermutations } from '../helpers/combinations.js';
import { buildNumberFromDigits } from '../helpers/utils.js';

/**
 * Take the number 192 and multiply it by each of 1, 2, and 3:

 192 × 1 = 192
 192 × 2 = 384
 192 × 3 = 576
 By concatenating each product we get the 1 to 9 pandigital,
 192384576. We will call 192384576 the concatenated product of 192 and (1,2,3)

 The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5,
 giving the pandigital, 918273645, which is the concatenated product of 9 and (1,2,3,4,5).

 What is the largest 1 to 9 pandigital 9-digit number that can be formed as the
 concatenated product of an integer with (1,2, ... , n) where n > 1?
 */


// const TEST_ANSWER = 192384576
const TEST_ANSWER = 918273645
const TEST_ARGS = {
    min: TEST_ANSWER - 1,
    max: TEST_ANSWER + 1,
}
const ARGS = {
    min: TEST_ANSWER,
    max: 987654321
}

const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1];

// need to limit number of permutations, so use that we know the answer must start with 9
const getPermutations = (startingDigit) => {
    const digits = DIGITS.filter(v => v !== Number(startingDigit))
    const permutations = buildPermutations(digits, digits.length)
    // append the first digit to the start of the array
    return permutations.map((arr) =>
        [Number(startingDigit), ...arr]
    )
}

const solution = ({ min, max }) => {
    let answer = [];
    let index = 0;
    while (!answer.length && index < DIGITS.length - 1) {
        let startingDigit = DIGITS.toString().substring(index, 1);
        const permutations = getPermutations(startingDigit);
        // filter permutations - mostly for test answer
        const filteredPermutations = permutations.filter((v) => {
            const value = buildNumberFromDigits(v)
            return value > min && value < max
        });

        // take first digit. multiply by 1. if it equals the start of the string. slice the string.
        // go from where we left off. multiply the first digit by 2. if it equals the next part of the string. slice.
        // stop when the string length is 0.
        // if first digit stop working. go back to original string and try two digits.
        // continue up until half length
        for (let i = filteredPermutations.length - 1; i >= 0; i--) {
            const digits = filteredPermutations[i]
            const permutationString = digits.join('')

            for (let j = 1; j < permutationString.length / 2; j++) {
                let count = 1;
                const base = permutationString.substring(0, j)
                const baseAsNumber = Number(base);
                let isInvalid = false
                let remainingString = permutationString;
                while (remainingString.length > 0 && !isInvalid) {
                    const valueForCompare = (baseAsNumber * count).toString();
                    if (remainingString.substring(0, valueForCompare.length) === valueForCompare) {
                        remainingString = remainingString.substring(valueForCompare.length);
                        count++;
                        continue
                    }
                    isInvalid = true
                }
                if (remainingString.length === 0 && !isInvalid) {
                    answer.push(permutationString);
                    break
                }
            }
        }
        index++
    }
    return Math.max(...answer)
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)