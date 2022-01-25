import { template } from '../helpers/template.js';
import { NAMES } from '../data/22.js';
import { getPositionInAlphabet } from '../helpers/strings.js'

/**
 * Using names.txt (right click and 'Save Link/Target As...'),
 * a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order.
 * Then working out the alphabetical value for each name, multiply this value by its alphabetical position
 * in the list to obtain a name score.

 For example, when the list is sorted into alphabetical order,
 COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list.
 So, COLIN would obtain a score of 938 × 53 = 49714.

 What is the total of all the name scores in the file?
 */

const TEST_ANSWER = 49714;

// get COLIN for testing
const TEST_ARGS = {
    start: 937,
    end: 938
}

const ARGS = {
    start: 0,
    end: 5163,
}

const SORTED_NAMES = NAMES.sort();


const getSumForWord = (order) => {
    let sum = 0;
    const word = SORTED_NAMES[order];
    for (let position = 0; position < word.length; position++) {
        sum += getPositionInAlphabet(word, position)
    }
    return sum
}

const getProductForWord = (order) => {
    const sum = getSumForWord(order);
    return sum * (order + 1)
}

const solution = ({ start, end }) => {
    let totalSum = 0;
    for (let order = start; order < end; order++) {
        totalSum += getProductForWord(order)
    }
    return totalSum
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)