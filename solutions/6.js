import { template } from '../helpers/template.js'

/**
 * The sum of the squares of the first ten natural numbers is,

 The square of the sum of the first ten natural numbers is,

 Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is .

 Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
 */

const ARGS = {
    max: 100,
}
const TEST_ARGS = {
    max: 10,
}
const TEST_ANSWER = 3025 - 385

const getSumSquares = (max) => {
    let sum = 0;
    for (let i = 1; i <= max; i++) {
        sum += (i ** 2)
    }
    return sum
}
const getSquareOfSums = (max) => {
    let sum = 0;
    for (let i = 1; i <= max; i++) {
        sum += i
    }
    return sum ** 2
}

const getDifference = (num1, num2) => num1 > num2 ? num1 - num2 : num2 - num1

const solution = ({ max }) => {
    const sumSquares = getSumSquares(max);
    const squareSums = getSquareOfSums(max);
    return getDifference(sumSquares, squareSums)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)
