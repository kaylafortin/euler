import {
    getFactorial,
} from './utils.js';

export const getNumCombinations = ({ n, r }) => getFactorial(n) / (getFactorial(r) * (getFactorial(n - r)))

export const getNumCombinationsRepetition = ({ n, r }) =>
    getFactorial(n + r - 1) / (getFactorial(r) * (getFactorial(n - 1)))

export const getNumPermutations = ({ n, r }) => (getFactorial(n)) / (getFactorial(n - r))

export const getNumPermutationsRepetition = ({ n, r }) => n ** r

export const buildCombinations = (elements, length) => {
    const combinations = []
    for (let i = 0; i < elements.length; i++) {
        if (length === 1) {
            combinations.push([elements[i]]);
        } else {
            let remaining = buildCombinations(elements.slice(i + 1), length - 1);
            for (let index = 0; index < remaining.length; index++) {
                const next = remaining[index]
                combinations.push([elements[i], ...next]);
            }
        }
    }
    return combinations;
}

// util for generating permutations from combinations
const getPermutations = ({ n, r, list = [] }) => {
    if (list.length === 0)
        return [[]];

    let result = [];

    for (let i = 0; i < list.length; i++) {
        // Clone list (kind of)
        let copy = Object.create(list);
        // Cut one element from list
        const head = copy.splice(i, 1);
        // Permute rest of list
        const rest = getPermutations({ n, r, list: copy });
        // Add head to each permutation of rest of list
        for (let j = 0; j < rest.length; j++) {
            const next = head.concat(rest[j]);
            result.push(next);
        }
    }
    return result;
}

export const buildPermutations = (elements, length) => {
    const n = elements.length;
    const permutations = []
    const combinations = buildCombinations(elements, length)
    for (let i = 0; i < combinations.length; i++) {
        permutations.push(...getPermutations({ n, r: length, list: combinations[i] }))

    }
    return permutations;
}


export const buildCombinationRepetition = (elements, length) => {
    let combo = []
    const combinations = [];

    function recursiveRepetition(need, s, a) {
        if (need === 0) {
            combo = a.slice(0);
            combinations.push(combo);
            return;
        }
        for (let i = s; i < elements.length; i++) {
            combo = a.slice(0);
            combo.push(elements[i]);
            recursiveRepetition(need - 1, i, combo);
        }
    }

    recursiveRepetition(length, 0, []);

    return combinations
};

export const buildPermutationsRepetition = (elements, length) => {
    const n = elements.length;
    const permutations = []
    const combinations = buildCombinationRepetition(elements, length)
    let permutationsTemp;
    for (let i = 0; i < combinations.length; i++) {
        permutationsTemp = getPermutations({ n, r: length, list: combinations[i] });

        // get rid of duplicates
        // TODO: optimize so we do generate duplicates to begin with
        const uniquePerms = Object.values(permutationsTemp.reduce((acc, combo) => {
            const str = combo.join('');
            if (!acc[str]) {
                acc[str] = combo;
            }
            return acc
        }, {}))
        permutations.push(...uniquePerms)
    }
    return permutations;
}
