import { template } from '../helpers/template.js';
import { buildPermutations } from '../helpers/combinations.js';
import { buildNumberFromDigits, getDigitsOfNumber } from '../helpers/utils.js';

/**
 * The cube, 41063625 (3453), can be permuted to produce two other cubes:56623104 (3843) and 66430125 (4053).
 * In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.

 Find the smallest cube for which exactly five permutations of its digits are cube.
 */


const TEST_ANSWER = 41063625;

const TEST_ARGS = {
    length: 3,
    minDigits: 6,
}
const ARGS = {
    length: 5,
    minDigits: 8,
}

const getCube = (num) => num ** 3

const getCubeRoot = (num) => Math.cbrt(num)

const getIsCube = (num) => {
    const cube = getCubeRoot(num);
    return cube % 1 === 0;
}

const getNumberOfCubesForPermutations = (num) => {
    const digitArray = getDigitsOfNumber(num);
    const permutations = [...new Set(buildPermutations(digitArray, digitArray.length).map((v) => {
        const num = buildNumberFromDigits(v);
        if (num.toString().length !== v.length) return null;
        return num
    }).filter(Boolean))]
    let count = 0;

    for (let i = 0; i < permutations.length; i++) {
        if (getIsCube(permutations[i])) {
            count++
        }
    }
    return count;
}

const getCubesInRange = (digits) => {
    const cubeMax = 10 ** digits;
    const cubeMin = 10 ** (digits - 1);
    const cubes = [];
    let num = Math.ceil(getCubeRoot(cubeMin));
    let isValid = true;
    while (isValid) {
        const cube = getCube(num);
        if (cube > cubeMin && cube < cubeMax) {
            cubes.push(cube);
        }
        if (cube > cubeMax) isValid = false;
        num++
    }
    return cubes
}

const getIsPermutation = (num1, num2) => {
    const num1String = num1.toString();
    let num2String = num2.toString();
    for (let i = 0; i < num1String.length; i++) {
        const digit = num1String[i];
        const firstIndex = num2String.indexOf(digit);
        if (firstIndex < 0) {
            return false;
        }
        num2String = num2String.slice(0, firstIndex) + num2String.slice(firstIndex + 1)
    }
    return num2String.length === 0
}

const getPermutationsForCube = (num, cubes) => {
    let count = 0;
    for (let i = 0; i < cubes.length; i++) {
        if (getIsPermutation(num, cubes[i])) {
            count++
        }
    }
    return count
}


const solution = ({ length, minDigits }) => {
    let digits = minDigits;
    let answer;
    while (!answer) {
        const cubes = getCubesInRange(digits);
        for (let i = 0; i < cubes.length; i++) {
            if (getPermutationsForCube(cubes[i], cubes) === length) {
                answer = cubes[i];
                break;
            }
        }
        digits++
    }
    return answer
}


template(ARGS, TEST_ARGS, TEST_ANSWER, solution)