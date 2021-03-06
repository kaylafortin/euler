import { template } from '../helpers/template.js';

/**
 *
 * Consider all integer combinations of a ** b for 2 ≤ a ≤ 5 and 2 ≤ b ≤ 5:

 22=4, 23=8, 24=16, 25=32
 32=9, 33=27, 34=81, 35=243
 42=16, 43=64, 44=256, 45=1024
 52=25, 53=125, 54=625, 55=3125
 If they are then placed in numerical order, with any repeats removed, we get the following sequence of 15 distinct terms:

 4, 8, 9, 16, 25, 27, 32, 64, 81, 125, 243, 256, 625, 1024, 3125

 How many distinct terms are in the sequence generated by ab for 2 ≤ a ≤ 100 and 2 ≤ b ≤ 100?
 */

const TEST_ANSWER = 15;

const TEST_ARGS = {
    min: 2,
    max: 5,
}
const ARGS = {
    min: 2,
    max: 100,
}


const solution = ({ min, max }) => {
    const uniqueObject = {};
    let count = 0;
    const updateObject = (val) => {
        if (!uniqueObject[val]) {
            uniqueObject[val] = val;
            count += 1
        }
    }
    for (let a = min; a <= max; a++) {
        updateObject(a ** a)
        for (let b = a + 1; b <= max; b++) {
            updateObject(a ** b)
            updateObject(b ** a)
        }
    }
    return count
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)