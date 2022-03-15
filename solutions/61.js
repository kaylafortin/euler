import { template } from '../helpers/template.js';
import {
    getHeptagonalValue,
    getHexagonalValue, getOctagonalValue,
    getPentagonalValue,
    getSquareValue,
    getTriangleValue
} from '../helpers/shapes.js';

/**
 * Triangle, square, pentagonal, hexagonal, heptagonal, and octagonal numbers are all figurate (polygonal)
 * numbers and are generated by the following formulae:

 Triangle        P3,n=n(n+1)/2        1, 3, 6, 10, 15, ...
 Square        P4,n=n2        1, 4, 9, 16, 25, ...
 Pentagonal        P5,n=n(3n−1)/2        1, 5, 12, 22, 35, ...
 Hexagonal        P6,n=n(2n−1)        1, 6, 15, 28, 45, ...
 Heptagonal        P7,n=n(5n−3)/2        1, 7, 18, 34, 55, ...
 Octagonal        P8,n=n(3n−2)        1, 8, 21, 40, 65, ...
 The ordered set of three 4-digit numbers: 8128, 2882, 8281, has three interesting properties.

 The set is cyclic, in that the last two digits of each number is the first two digits of the next number
 (including the last number with the first).
 Each polygonal type: triangle (P3,127=8128), square (P4,91=8281), and pentagonal (P5,44=2882),
 is represented by a different number in the set.
 This is the only set of 4-digit numbers with this property.
 Find the sum of the only ordered set of six cyclic 4-digit numbers for which each polygonal type:
 triangle, square, pentagonal, hexagonal, heptagonal, and octagonal, is represented by a different number in the set.
 */

/**
 * NOTES:
 * 4 digit numbers
 * start with set that has least numbers in range
 * two groups? group first 2 digits together & group last two digits together
 * start with 1 number - start with first 2 digits since there may be less matches.
 * 1. array of all values.
 * 2. pick a number.
 * 3. filter out all other poly = that value.
 * 4. store this number in temp array.
 * 5. find all matches for a === b.
 * map over matches.
 * temp push value.
 * filter out all other poly
 * find all matches for a === b.
 * if matches length ===0 break;
 * pop off last value.
 * continue
 * when temp.length === length -1 then we are on last match.
 * final check = base a === temp.last b
 */
const TEST_ANSWER = 8128 + 2882 + 8281
const TEST_ARGS = {
    length: 3,
}
const ARGS = {
    length: 6
}

const POLYGONAL_FUNCTIONS = [getTriangleValue, getSquareValue, getPentagonalValue, getHexagonalValue, getHeptagonalValue, getOctagonalValue]

const getValues = (length) => {
    const values = [];
    const polygonalFunctions = POLYGONAL_FUNCTIONS.slice(0, length);
    for (let n = 1; n < 10000; n++) {
        polygonalFunctions.map((func, index) => {
            const value = func(n);
            if (value >= 1000 && value < 10000) {
                const valueString = value.toString();
                const a = valueString.slice(0, 2);
                const b = valueString.slice(2)
                values.push({ n, value, a, b, poly: index })
            }
        })
    }
    return values;
}

const getMatches = (tempAnswer, values) => {
    const usedPolys = tempAnswer.map(({ poly }) => poly);

    // remove all values from sets that are already in temp answer;
    const filteredValues = values.filter(val => !usedPolys.includes(val.poly))
    const lastAnswer = tempAnswer[tempAnswer.length - 1];
    return filteredValues.filter(v => lastAnswer.a === v.b)
}

const getAreMatches = (tempAnswer, values) => {
    const matches = getMatches(tempAnswer, values)
    return matches.length === 0 ? null : matches
}

const checkLastMatch = (tempAnswer, lastMatch) => lastMatch.a === tempAnswer[0].b

const getSum = (values) => values.reduce((acc, v) => {
    acc += v.value
    return acc
}, 0)

const loopOverMatches = (values, tempAnswer, length, allValues) => {
    for (let i = 0; i < values.length; i++) {
        const base = values[i];
        tempAnswer.push(base);
        if (tempAnswer.length === length) {
            if (checkLastMatch(tempAnswer, base)) {
                return tempAnswer
            }
            tempAnswer.pop()
        } else {
            const matches = getAreMatches(tempAnswer, allValues)
            if (!matches) {
                tempAnswer.pop()
                continue;
            }
            loopOverMatches(matches, tempAnswer, length, allValues)
            if (tempAnswer.length !== length) {
                tempAnswer.pop()
            }
        }
    }
    return tempAnswer
}

const solution = ({ length }) => {
    const values = getValues(length);
    const answer = loopOverMatches(values, [], length, values)
    return getSum(answer)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)