import { template } from '../helpers/template.js';

/**
 * The series, 1**1 + 2**2 + 3**3 + ... + 10**10 = 10405071317.

 Find the last ten digits of the series, 1**1 + 2**2 + 3*3 + ... + 1000**1000.
 */

const TEST_ANSWER = 1317
const TEST_ARGS = {
    limit: 10,
    digits: 4,
}
const ARGS = {
    limit: 1000,
    digits: 10,
}

const getPower = (n) => n ** n;
const getAnswer = (sum, digits) => {
    const sumString = sum.toString();
    const end = sumString.length;
    return Number(sumString.slice(end - digits, end))
}

const solution = ({ digits, limit }) => {
    let n = BigInt(1);
    let sum = BigInt(0);
    while (n <= limit) {
        sum += getPower(n)
        n++
    }
    return getAnswer(sum, digits)
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)