import { template } from '../helpers/template.js';
import { buildNumberFromDigits, getArraySum, getIsDivisible, getPrimes } from '../helpers/utils.js';
import { buildPermutations } from '../helpers/combinations.js';

/**
 * The number, 1406357289, is a 0 to 9 pan-digital number because it is made up of each of the digits 0 to 9 in some order,
 * but it also has a rather interesting sub-string divisibility property.

 Let d1 be the 1st digit, d2 be the 2nd digit, and so on. In this way, we note the following:

 d2d3d4=406 is divisible by 2
 d3d4d5=063 is divisible by 3
 d4d5d6=635 is divisible by 5
 d5d6d7=357 is divisible by 7
 d6d7d8=572 is divisible by 11
 d7d8d9=728 is divisible by 13
 d8d9d10=289 is divisible by 17
 Find the sum of all 0 to 9 pan-digital numbers with this property.
 */

const TEST_ANSWER = null

const TEST_ARGS = {}
const ARGS = {}
const SUB_STRING_LENGTH = 3 // assumption: this is for 3 digit sections
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


const getRemainingDigits = (digits) => DIGITS.filter((d) => !digits.includes(d))

const getOptionsForLastThreeDigits = (primes, digitsArr) => {
    const lastPrime = primes[primes.length - 1]  // 17
    const options = buildPermutations(digitsArr, SUB_STRING_LENGTH);
    return options.filter((arr) => {
        const number = buildNumberFromDigits(arr);
        return getIsDivisible(lastPrime, number)
    })
}

const buildPanDigitalPrimeSubstrings = (primeList, currentOptions = []) => {
    const options = []
    let isMax = false
    for (let k = 0; k < currentOptions.length; k++) {
        const currentOption = currentOptions[k]
        // the bigger the option the further up the prime list we move
        const primeIndex = primeList.length - 1 - (currentOption.length - 2);
        const prime = primeList[primeIndex];
        const remainingDigits = getRemainingDigits(currentOption);
        // there will be one digit left over to append at the end
        if (remainingDigits.length <= 1) {
            isMax = true
        }

        for (let i = 0; i < remainingDigits.length; i++) {
            // add the element to the start of the array
            const newArr = [remainingDigits[i], ...currentOption];
            // use only the last 3 digits for comparison
            const number = buildNumberFromDigits(newArr.slice(0, 3));
            // if it is the end, just add the last digit to the start otherwise check if the prime is divisible
            if (isMax || getIsDivisible(prime, number)) {
                options.push(newArr)
            }
        }
    }

    // if there are no more options, then that that means we reached the end
    // otherwise keep looping
    return !!options.length ? buildPanDigitalPrimeSubstrings(primeList, options) : currentOptions

}

const solution = () => {
    const answers = []
    const primes = getPrimes(17);
    const optionsForLastDigits = getOptionsForLastThreeDigits(primes, DIGITS)
    const startingOptions = buildPanDigitalPrimeSubstrings(primes, optionsForLastDigits);

    // convert the arrays of digits to numbers
    for (let i = 0; i < startingOptions.length; i++) {
        const num = buildNumberFromDigits(startingOptions[i]);
        answers.push(num)
    }
    return getArraySum(answers)
}


template(ARGS, TEST_ARGS, TEST_ANSWER, solution)