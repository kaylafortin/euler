import { template } from '../helpers/template.js';
import { getNumCombinations } from '../helpers/combinations.js';

/**
 There are exactly ten ways of selecting three from five, 12345:

 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345

 In combinatorics, we use the notation, (5/3)

 It is not until (23/10) that a value exceeds one-million:

 How many, not necessarily distinct, values of
 (n/r) for 1 <= n <= 100 are greater than one-million?

 */

const TEST_ANSWER = 4
const TEST_ARGS = {
    min: 1,
    max: 23
}
const ARGS = {
    min: 1,
    max: 100
}

const LIMIT = 1000000;

const getIsComboAboveLimit = ({ n, r }) => {
    const numberOfCombos = getNumCombinations({ n, r });
    return numberOfCombos > LIMIT;
}

const getNumberOfCombosAboveLimit = (n) => {
    let count = 0;
    for (let r = 1; r < n; r++) {
        if (getIsComboAboveLimit({ n, r })) {
            count++
        }
    }
    return count
}

const solution = ({ min, max }) => {
    let count = 0
    for (let n = min; n <= max; n++) {
        const comboCount = getNumberOfCombosAboveLimit(n)
        count += comboCount
    }
    return count
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)