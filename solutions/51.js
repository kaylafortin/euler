import { template } from '../helpers/template.js';
import { buildNumberFromDigits, getDigitsOfNumber, getPrimes, isPrime } from '../helpers/utils.js';

/**
 * By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values:
 * 13, 23, 43, 53, 73, and 83, are all prime.

 By replacing the 3rd and 4th digits of 56**3 with the same digit,
 this 5-digit number is the first example having seven primes among the ten generated numbers,
 yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993.
 Consequently 56003, being the first member of this family, is the smallest prime with this property.

 Find the smallest prime which, by replacing part of the number
 (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
 *
 */


// const TEST_ANSWER = 56003
//
// const TEST_ARGS = {
//     length: 7,
//     max: 70000,
//     min: 0,
//     digits: 2,
// }
const TEST_ANSWER = 13
const TEST_ARGS = {
    length: 6,
    max: 500,
    min: 0,
    digits: 1,
}
const ARGS = {
    length: 8,
    max: 500000,
    min: 0,
    digits: 2,
}
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const getIsPrime = (number, primeList) => {
    return number < primeList[primeList.length - 1] ? primeList.includes(number) : isPrime(number);
}


const buildSwappedArray = (digit, index, digitArray) => [...digitArray.slice(0, index), digit, ...digitArray.slice(index + 1)]

const getIsSwappedPrime = (digit, i, digitArray, primeList) => {
    const fullDigitArray = buildSwappedArray(digit, i, digitArray)
    return getIsPrime(fullDigitArray, primeList)
}

const getPrimeFamilyMatchesLength = ({ prime, primeList, length, digits }) => {

    const primeDigits = getDigitsOfNumber(prime);
    for (let i = 0; i < primeDigits.length - 1; i++) {
        for (let k = i + 1; k < primeDigits.length; k++) {
            let count = 0;
            for (let j = 0; j < DIGITS.length; j++) {
                const remainingDigits = DIGITS.length - j;
                if (length - count > remainingDigits) break;
                const swappedDigit = DIGITS[j]
                if (swappedDigit === 0 && i === 0) continue
                const swappedPositionI = buildSwappedArray(swappedDigit, i, primeDigits);
                const fullDigitArray = buildSwappedArray(swappedDigit, k, swappedPositionI)
                const number = buildNumberFromDigits(fullDigitArray);
                if (getIsPrime(number, primeList)) {
                    count++
                    // newPrimeList = newPrimeList.filter(v => v !== number)
                }
            }
            if (count === length) {

                return { isFamilyLength: true }
            }
        }
    }
    return { isFamilyLength: false, }
}


const getPrimeFamilyMatchesLengthThree = ({ prime, primeList, length, digits }) => {

    const primeDigits = getDigitsOfNumber(prime);
    for (let i = 0; i < primeDigits.length - 1; i++) {
        for (let k = i + 1; k < primeDigits.length; k++) {

            for (let p = k + 1; p < primeDigits.length; p++) {
                let count = 0;
                let smallestAnswer;
                for (let j = 0; j < DIGITS.length; j++) {
                    const remainingDigits = DIGITS.length - j;
                    if (length - count > remainingDigits) break;
                    const swappedDigit = DIGITS[j]
                    if (swappedDigit === 0 && i === 0) continue
                    const swappedPositionI = buildSwappedArray(swappedDigit, i, primeDigits);
                    const nextDigitArray = buildSwappedArray(swappedDigit, k, swappedPositionI)
                    const fullDigitArray = buildSwappedArray(swappedDigit, p, nextDigitArray)
                    const number = buildNumberFromDigits(fullDigitArray);
                    if (getIsPrime(number, primeList)) {
                        if (!smallestAnswer) smallestAnswer = number
                        count++
                    }
                }
                if (count === length) {
                    return { isFamilyLength: true, answer: smallestAnswer }
                }
            }
        }
    }
    return { isFamilyLength: false, }
}


const getPrimeFamilyMatchesLengthSingle = ({ prime, primeList, length }) => {
    const primeDigits = getDigitsOfNumber(prime);
    for (let i = 0; i < primeDigits.length - 1; i++) {

        let count = 0;
        for (let j = 0; j < DIGITS.length; j++) {
            const remainingDigits = DIGITS.length - j;
            if (length - count > remainingDigits) break;
            const swappedDigit = DIGITS[j]
            if (swappedDigit === 0 && i === 0) continue
            const fullDigitArray = buildSwappedArray(swappedDigit, i, primeDigits);

            const number = buildNumberFromDigits(fullDigitArray);
            if (getIsPrime(number, primeList)) {
                count++
                // newPrimeList = newPrimeList.filter(v => v !== number)
            }
        }
        if (count === length) {
            return { isFamilyLength: true }
        }

    }
    return { isFamilyLength: false }
}


const solution = ({ length, max, min }) => {
    let answer = 0;
    let primes = [];
    let num = 3;
    while (!answer && num < max) {
        if (isPrime(num, primes)) {
            primes.push(num);
            if (num > min) {
                const isFamilyLength = getPrimeFamilyMatchesLength(num, primes, length)
                if (isFamilyLength) {
                    answer = num;
                    break
                }
            }
        }
        num++
    }
    return answer
}


const solution2 = ({ length, max, min, digits }) => {
    let answer = 0;
    const primes = getPrimes(max);
    let i = 0;
    while (!answer && i < primes.length) {
        const prime = primes[i];
        if (prime < min) continue

        let getAnswerFunc;
        let max = Math.min(getDigitsOfNumber(prime).length - 1, 3)

        for (let k = digits; k <= max; k++) {
            if (k === 1) getAnswerFunc = getPrimeFamilyMatchesLengthSingle;
            if (k === 2) getAnswerFunc = getPrimeFamilyMatchesLength;
            if (k === 3) getAnswerFunc = getPrimeFamilyMatchesLengthThree;

            const { isFamilyLength, answer: smallAnswer } = getAnswerFunc({
                prime,
                primeList: primes,
                length
            })

            if (isFamilyLength) {
                answer = smallAnswer || prime;
                return answer
            }
        }

        i++
    }
    return answer
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution2)