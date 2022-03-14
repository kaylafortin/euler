import { template } from '../helpers/template.js';

/**
 * It is possible to show that the square root of two can be expressed as an infinite continued fraction.
 By expanding this for the first four iterations, we get:

 The next three expansions are but the eighth expansion,
 is the first example where the number of digits in the numerator exceeds the number of digits in the denominator.

 In the first one-thousand expansions, how many fractions contain a numerator with more digits than the denominator?
 */
const TEST_ANSWER = 1;
const TEST_ARGS = {
    max: 10,
}
const ARGS = {
    max: 1000
}

const getLength = (num) => num.toString().length

// find pattern to convert to big int rather than fractions
const solution = ({ max }) => {
    let count = 0;

    let d = BigInt(2);
    let n = BigInt(3);

    for (let i = 1; i < max; i++) {
        const nextN = n + BigInt(2) * d;
        const nextD = n + d
        n = nextN;
        d = nextD
        if (getLength(n) > getLength(d)) {
            count++;
        }
    }
    return count;
}
template(ARGS, TEST_ARGS, TEST_ANSWER, solution)