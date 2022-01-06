import { template } from '../helpers/template.js';
import { create, all } from 'mathjs'

/**
 * A unit fraction contains 1 in the numerator.
 * The decimal representation of the unit fractions with denominators 2 to 10 are given:

 1/2    =    0.5
 1/3    =    0.(3)
 1/4    =    0.25
 1/5    =    0.2
 1/6    =    0.1(6)
 1/7    =    0.(142857)
 1/8    =    0.125
 1/9    =    0.(1)
 1/10    =    0.1
 Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

 Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.
 */

// configure the default type of numbers as Fractions
const config = {
    number: 'Fraction'
}

// create a mathjs instance with everything included
const math = create(all, config)

const TEST_ANSWER = 7;

const TEST_ARGS = {
    max: 10,
}
const ARGS = {
    max: 1000,
}

const regex = '\\d+(?=\\))';

const getRepeatingDigitsStr = (divisor) => {
    const value = math.fraction(`1/${divisor}`);
    return math.format(value, { fraction: 'decimal' }).toString()
}

const getNumOfRepeatingDigits = (divisor) => {
    const str = getRepeatingDigitsStr(divisor);
    const repeatingDigits = str.match(regex);
    return !!repeatingDigits ? repeatingDigits[0].length : 0
}

const solution = ({ max }) => {
    let answer = {
        num: 0,
        digits: 0
    }

    for (let j = 2; j < max; j++) {
        const digits = getNumOfRepeatingDigits(j);
        if (digits > answer.digits) {
            answer.digits = digits
            answer.num = j
        }
    }

    return answer.num

}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)