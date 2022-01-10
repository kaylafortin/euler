import { getArraySum } from '../helpers/utils.js'
import { template } from '../helpers/template.js';

/**
 * If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.
 * The sum of these multiples is 23.
 * Find the sum of all the multiples of 3 or 5 below 1000.
 */

// input multiple 1, multiple 2, below number
// output sum of multiples

// implementation notes:
// remove duplicates

const TEST_ANSWER = 23;

const ARGS = {
    multiple1: 3,
    multiple2: 5,
    limit: 1000
}
const TESTING_ARGS = {
    multiple1: 3,
    multiple2: 5,
    limit: 10
}

const getOverlaps = (multiple1, multiple2, limit) => {
    const product = multiple1 * multiple2;
    const numOfDuplicates = Math.floor((limit - 1) / product);
    let duplicates = [];
    for (let i = 1; i <= numOfDuplicates; i++) {
        duplicates.push(i * product);
    }
    return duplicates
}


const getNaturals = (multiple, limit) => {
    let naturals = [];
    const numOfNaturals = Math.floor((limit - 1) / multiple);
    for (let i = 1; i <= numOfNaturals; i++) {
        naturals.push(i * multiple);
    }

    return naturals
}

const getNaturalSums = (multiple, limit) => getArraySum(getNaturals(multiple, limit))


const naturalSums = ({ multiple1, multiple2, limit }) => {
    const sum1 = getNaturalSums(multiple1, limit);
    const sum2 = getNaturalSums(multiple2, limit);
    const duplicates = getArraySum(getOverlaps(multiple1, multiple2, limit));
    return sum1 + sum2 - duplicates;
}

template(ARGS, TESTING_ARGS, TEST_ANSWER, naturalSums)



