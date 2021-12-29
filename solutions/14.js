import { template } from '../helpers/template.js'
import { getIsDivisible } from '../helpers/utils.js';

/**
 *The following iterative sequence is defined for the set of positive integers:

 n → n/2 (n is even)
 n → 3n + 1 (n is odd)

 Using the rule above and starting with 13, we generate the following sequence:

 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
 It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms.
 Although it has not been proved yet (Collatz Problem),
 it is thought that all starting numbers finish at 1.

 Which starting number, under one million, produces the longest chain?

 NOTE: Once the chain starts the terms are allowed to go above one million.
 */

const TEST_ANSWER = 13;
const TEST_ARGS = {
    max: 13,
    min: 12,
};
const ARGS = {
    max: 1000000,
    min: 1,
};

const onOdd = (num) => 3 * num + 1;
const onEven = (num) => num / 2;
const getIsEven = (num) => getIsDivisible(2, num);
const getNextNumber = (num) => getIsEven(num) ? onEven(num) : onOdd(num);

const buildChain = (root, chain = []) => {
    const next = getNextNumber(root);
    chain.push(next);
    if (next !== 1) {
        return buildChain(next, chain)
    }
    return chain
}


const solution = ({ max, min }) => {
    let number = 0;
    let length = 0;
    for (let i = max; i >= min; i--) {
        const chain = buildChain(i, [i]);
        const chainLength = chain.length;
        if (chainLength > length) {
            number = i;
            length = chainLength;
        }
    }
    console.log({
        length,
        number
    })
    return number
}


template(ARGS, TEST_ARGS, TEST_ANSWER, solution)