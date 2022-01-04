import { template } from '../helpers/template.js';

/**
 * The Fibonacci sequence is defined by the recurrence relation:

 Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
 Hence the first 12 terms will be:

 F1 = 1
 F2 = 1
 F3 = 2
 F4 = 3
 F5 = 5
 F6 = 8
 F7 = 13
 F8 = 21
 F9 = 34
 F10 = 55
 F11 = 89
 F12 = 144
 The 12th term, F12, is the first term to contain three digits.

 What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
 */

const TEST_ANSWER = 12;
const TEST_ARGS = {
    digits: 3
};
const ARGS = {
    digits: 1000
}

const getFibonacciSequence = ({ maxIndex, maxSum }) => {
    const sequence = [BigInt(1), BigInt(1)]
    while ((!!maxIndex && sequence.length < maxIndex) || (!!maxSum && sequence[sequence.length - 1] <= maxSum)) {
        const [f1, f2] = sequence.slice(sequence.length - 2);
        sequence.push(BigInt(f1 + f2))
    }
    return sequence
}

const getMaxForNumDigits = (digits) => BigInt(10) ** BigInt(digits - 1) - BigInt(1)

const solution = ({ digits }) => {
    const maxSum = getMaxForNumDigits(digits);
    const sequence = getFibonacciSequence({ maxSum })
    return sequence.length
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)