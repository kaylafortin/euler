import { template } from '../helpers/template.js';
import { WORDS } from '../data/42.js'
import { getPositionInAlphabet } from '../helpers/strings.js'

/**
 * The nth term of the sequence of triangle numbers is given by, tn = ½n(n+1); so the first ten triangle numbers are:

 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

 By converting each letter in a word to a number corresponding to its alphabetical position
 and adding these values we form a word value. For example, the word value for SKY is 19 + 11 + 25 = 55 = t10.
 If the word value is a triangle number then we shall call the word a triangle word.

 Using words.txt (right click and 'Save Link/Target As...'), a 16K text file containing nearly two-thousand common English words, how many are triangle words?
 */

const INDEX_OF_SKY = WORDS.findIndex((w) => w === 'SKY');
const LIMIT = WORDS.length;

const TEST_ANSWER = 1

const TEST_ARGS = {
    start: INDEX_OF_SKY - 3,
    end: INDEX_OF_SKY + 1
}
const ARGS = {
    start: 0,
    end: LIMIT
}

const getTriangleValue = (n) => ((1 / 2) * (n)) * (n + 1)

const getSumOfCharacters = (word) => {
    let sum = 0
    for (let i = 0; i < word.length; i++) {
        sum += getPositionInAlphabet(word[i])
    }
    return sum
}

// keep log of values - if value of word is less than max we have - check object
// else add more until triangle passes max
const solution = ({ start, end }) => {
    const triangleValuesObject = {}
    const triangleValuesArray = [];
    let maxT = 0
    const answers = []
    const getMoreTriangleValues = (limit) => {
        let n = triangleValuesArray.length
        while (maxT < limit) {
            n++
            const t = getTriangleValue(n);
            triangleValuesObject[t] = n
            triangleValuesArray.push(t);
            maxT = t
        }
    }
    for (let i = start; i < end; i++) {
        const word = WORDS[i];
        const sum = getSumOfCharacters(word)
        if (sum > maxT) getMoreTriangleValues(sum);
        if (triangleValuesObject[sum]) answers.push(word)
    }

    return answers.length
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)