import { template } from '../helpers/template.js';

/**
 * The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.

 Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

 (Please note that the palindromic number, in either base, may not include leading zeros.)
 */

const TEST_ANSWER = 585
const TEST_ARGS = {
    max: 600,
}
const ARGS = {
    max: 1000000
}

const convertToBinary = (dec) => (dec >>> 0).toString(2);

const solution = () => {

}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)