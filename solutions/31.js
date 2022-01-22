import { template } from '../helpers/template.js';
import { getArraySum } from '../helpers/utils.js';
import { getNumCombinations } from '../helpers/combinations.js';
import { re } from 'mathjs';


/**
 * In the United Kingdom the currency is made up of pound (£) and pence (p).
 * There are eight coins in general circulation:

 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
 It is possible to make £2 in the following way:

 1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
 How many different ways can £2 be made using any number of coins?
 */

const CURRENCY = [1, 2, 5, 10, 20, 50, 100, 200]
const TEST_ANSWER = 41;
const TEST_ARGS = {
    sum: 20
}
const ARGS = {
    sum: 200,
}


const currencyCombinations = ({ currency, sum, combinations = [] }) => {
    const index = currency.length - 1
    const coin = currency[index];

    if (currency.length === 0) return combinations;

    const difference = sum - coin;
    if (difference === 0) {
        combinations.push(coin)
        return combinations
    }
    if (difference < 0) {
        return currencyCombinations({ currency: currency.slice(0, index), sum, combinations })
    }
    combinations.push(coin)
    return currencyCombinations({ currency: [...currency], sum: difference, combinations })

}


const getCurrency = (limit) => CURRENCY.filter(c => c < limit);

const getIsMinAnswer = (result) => !!result.length && result.filter(c => c !== 1).length === 0

function* getCurrencyOptions({ sum, maxCurrency, answer = [] }) {
    // if calling the first time we need to include the largest currency in the currency options
    const currency = getCurrency(maxCurrency || sum + 1);
    const maxSolution = currencyCombinations({ currency, sum });
    const isMin = getIsMinAnswer(maxSolution)
    answer.push(maxSolution)
    yield maxSolution
    if (!isMin) {
        let baseSum = 0;
        const filteredSolution = maxSolution.filter(c => c > 1);
        for (let i = 1; i < filteredSolution.length; i++) {
            const base = filteredSolution.slice(0, i)
            baseSum += filteredSolution[i - 1]
            const baseTotal = sum - baseSum;
            const getOther = getCurrencyOptions({ sum: baseTotal, maxCurrency: maxSolution[i] })
            for (const val of getOther) {
                const result = [...base, ...val];
                yield result
            }
        }
        yield* getCurrencyOptions({ sum, maxCurrency: maxSolution[0], answer })
    }
}


const solution = ({ sum }) => {
    let answers = [];
    const currencyOptions = getCurrencyOptions({ sum });
    for (const currencyOption of currencyOptions) {
        answers.push(currencyOption);
    }
    return answers.length
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)