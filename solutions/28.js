import { template } from '../helpers/template.js';

/**
 * Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

 21 22 23 24 25
 20  7  8  9 10
 19  6  1  2 11
 18  5  4  3 12
 17 16 15 14 13

 It can be verified that the sum of the numbers on the diagonals is 101.

 What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?
 */

const TEST_ANSWER = 101;

const TEST_ARGS = {
    width: 5,
}
const ARGS = {
    width: 1001,
}

const getSumForSpiral = (spiralNumber) => {
    let sum = 0;
    const spaceBetweenDiagonals = spiralNumber - 1;
    if (spaceBetweenDiagonals <= 0) return 1
    const maxValueForSpiral = spiralNumber * spiralNumber
    for (let i = 0; i < 4; i++) {
        const cellValue = (maxValueForSpiral) - i * spaceBetweenDiagonals;
        if (cellValue > 0) sum += cellValue
    }
    return sum;
}

const solution = ({ width }) => {
    let answer = 0
    for (let i = 1; i <= width; i += 2) {
        answer += getSumForSpiral(i)
    }
    return answer
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)