import { isPrime } from '../helpers/utils.js';
import { template } from '../helpers/template.js';
// create an array of primes - if need more ad more

// only certain primes can do this

// select first number, then check all the primes in that range
// select 3 check all 300s

const TEST_ANSWER = 792;
const TEST_ARGS = {
    length: 4,
    max: 1000,
}
const ARGS = {
    length: 5,
    max: 10000,
}

const checkConcat = (prime, base) => {
    const concat1 = (prime.toString() + base.toString());
    if (!isPrime(concat1)) return false;
    const concat2 = base.toString() + prime.toString();
    return isPrime(concat2)


}

// step one - get primes
const getPrimes = (minNum, maxNum) => {
    let primes = []
    for (let j = minNum; j <= maxNum; j++) {
        if (isPrime(j)) {
            primes.push(j);
        }
    }
    return primes
}


// is a number a prime
// check next prime - if it concats - add to array
// when adding check the other is array - if 5 concats, we can end
// this assuemds it starts with 3
// check for 5 and 7 base too?

// keep track of primes so dont have to kepe checking


const compareTwoLists = (list1, list2) => {
    return list2.filter((element) => list1.includes(element))
}


const getLastElemnt = (length) => length - 1
// step is level
const getIsEnoughMatches = (matches, step, length) => matches?.length >= (length - step)

const compareLoop = (step, length, currentList, index, list) => {
    const list2 = list[currentList[index]];
    const matches = compareTwoLists(currentList, list2);
    const isEnoughMatches = getIsEnoughMatches(matches, step, length);
    if (!isEnoughMatches) return null;
    return matches;
}

const compareListLoop = async (currentList, list, step, answerKey, lengthList) => {

    const answers = { ...answerKey };

    for (let i = 0; i < currentList?.length; i++) {

        answers[step] = currentList[i];
        if (step >= lengthList) {

            break
        }
        const matches = compareLoop(step, lengthList, currentList, i, list)

        if (matches && matches.length) {
            answers[step] = currentList[i];
            const newStep = step + 1

            if (newStep >= lengthList) {

                break;
            }

            return await compareListLoop(matches, list, newStep, answers, lengthList);

        }
    }
    return answers;
}

const buildPrimesArray = (max) => {
    console.time("primes");
    const array = getPrimes(0, max)
    // console.log(array)
    console.timeEnd("primes");
    return array
}

// 3, 7, 109
// list of all the ones that 3 works with
// list of all th ones that 5 work with
// list of all the ones that 7works with

const loopOverPrimes = (num, index, primes) => {
    const concatObj = []
    let hasMatch = false;
    // console.log(index);
    for (let i = index; i < primes.length; i++) {
        const primeCheck = primes[i];
        if (checkConcat(num, primeCheck)) {
            concatObj.push(primeCheck)
            // concatObj[primeCheck] = primeCheck;
            hasMatch = true;
        }
    }
// console.log(concatObj);
    return hasMatch && concatObj;
}


// three fdifferent options dor 7, and then an array should be returned with three elements
const checkConcatsArray = (conctArray, length, step, currentCheck = [], loop = [], num) => {

    if (conctArray.length < length - step && step < length) {
        return loop;

    }

    if (currentCheck?.length >= length) {
        loop.push(currentCheck);
    } else {
        let acc = {};
        for (let i = conctArray.length - 1; i >= 0; i--) {
            const elm = conctArray[i]

            const filtered = conctArray.filter((elm2) => {
                const isConcat = checkConcat(elm, elm2);

                return isConcat;
            });

            const newStep = step + 1;
            if (filtered?.length >= length - newStep) {
                if (currentCheck[currentCheck.length - 1] < elm) {
                    const foundConcats = [...currentCheck];
                    if (foundConcats[foundConcats.length - 1])
                        foundConcats.push(elm);
                    checkConcatsArray(filtered, length, newStep, foundConcats, loop)
                }
            }
        }
    }
    return loop;
}
/**
 *
 * [3] => [[3,7], 3,9]]
 */
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4

const getMinAnswer = (answer) => {

    const sumAcc = answer?.reduce((acc, array, index) => {
        const arrSum = array.reduce(reducer)
        if (!acc.sum || arrSum < acc.sum) {
            acc.sum = arrSum;
            acc.index = index;
        }
        return acc;
    }, {
        index: 0,
        sum: 0,
    })
    return sumAcc.sum;
}
const getByArray = ({ max, length = 3 }) => {
    const answer = [];
    let found = false;
    const primes = buildPrimesArray(max);
    const step = 1;
    for (let i = 0; i < primes.length; i++) {
        const num = primes[i];
        const concatsObject = loopOverPrimes(num, i, primes);
        if (concatsObject?.length >= length - step) {
            const currentCheck = [num];
            const concatsHEre = checkConcatsArray(concatsObject, length, step, currentCheck, [], num);
            const answers = concatsHEre?.forEach((concatArray) => {
                if (concatArray?.length >= length) {
                    found = true
                    console.log('prime factors: ', concatArray);
                    answer.push(concatArray)
                }
            });
        }
        if (found) {
            break;
        }
    }
    return getMinAnswer(answer)
}

template(ARGS, TEST_ARGS, TEST_ANSWER, getByArray)

