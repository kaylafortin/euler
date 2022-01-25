import { template } from '../helpers/template.js';
import { getArrayProduct } from '../helpers/utils.js';
import Fraction from 'fraction.js';

/**
 * The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may
 * incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

 We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

 There are exactly four non-trivial examples of this type of fraction, less than one in value,
 and containing two digits in the numerator and denominator.

 If the product of these four fractions is given in its lowest common terms, find the value of the denominator.
 */
const TEST_ANSWER = 2
const TEST_ARGS = {
    min: 96,
    max: 99
}
const ARGS = {
    min: 10,
    max: 99
}


const getRemainingDigit = (digits, commonDigit) => digits.filter((v) => v !== commonDigit)
const getDigitsFromNumber = (num) => num.toString().split('')

const solution = ({ min, max }) => {
    const answers = [];
    for (let denominator = min; denominator <= max; denominator++) {
        const denominatorDigits = getDigitsFromNumber(denominator)
        for (let numerator = 10; numerator < denominator; numerator++) {
            const numeratorDigits = getDigitsFromNumber(numerator)
            const digitsInCommon = numeratorDigits.find((d) => denominatorDigits.includes(d));

            // need the numerator and denominator to have a single overlapping digit
            if (digitsInCommon?.length !== 1) continue;
            const digitInCommon = digitsInCommon[0]
            // filter out the trivial examples
            if (denominator % 10 !== 0) {
                const [remainingNumerator] = getRemainingDigit(numeratorDigits, digitInCommon)
                const [remainingDenominator] = getRemainingDigit(denominatorDigits, digitInCommon)

                if (remainingNumerator / remainingDenominator === numerator / denominator) {
                    answers.push(numerator / denominator)
                }
            }
        }
    }

    const product = getArrayProduct(answers);
    // get the denominator of the product
    const { d } = new Fraction(product)
    return d
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)