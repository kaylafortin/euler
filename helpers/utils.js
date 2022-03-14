export const getMaxForNumDigits = (digits) => BigInt(10) ** BigInt(digits - 1) - BigInt(1)

export const getArraySum = (arr) => arr.reduce((acc, num) => {
    acc += Number(num);
    return acc;
}, 0)

export const getArrayProduct = (arr) => arr.reduce((acc, num) => {
    return acc * Number(num);
}, 1)

export const getDigitsOfNumber = (num) => {
    const str = typeof (num) !== 'string' ? num.toString() : num;
    return str.split('').map((item) => Number(item) || 0);
}

export const buildNumberFromDigits = (digitArr) => Number(digitArr.join(''))

export const getDigitsOfNumberSum = (num) => {
    const digitsArray = getDigitsOfNumber(num)
    return getArraySum(digitsArray);
}

export const getFactorial = num => {

    let sum = BigInt(1)
    for (let i = 1; i <= num; i++) {
        sum = BigInt(sum) * BigInt(i)
    }
    return sum < Number.MAX_SAFE_INTEGER ? Number(sum) : BigInt(sum);
}

export const createTriangle = (triangleStr) => triangleStr.split('\n').map((row, rowIndex) =>
    row.trim().split(' ').map((elm, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        data: Number(elm),
        sum: Number(elm),
        path: [],
    })));

export const isPrime = (num, list) => {
    if (num <= 1) return false;
    if (num === 2) return true;
    let isPrime = true
    if (!list || num > list[list.length - 1]) {
        let i = 3;
        if (num % 2 === 0) {
            return false
        }
        while (i <= Math.sqrt(num)) {
            if (num % i === 0) {
                isPrime = false;
                break
            }
            i += 2
        }
    } else {
        for (let i = 0; i < list.length; i++) {
            if (list[i] >= num / i) {
                break
            }
            if (num % list[i] === 0) {
                isPrime = false;
                break
            }
        }
    }

    return isPrime;
}


export const getPrimes = (maxNum) => {
    let primes = []
    for (let j = 1; j <= maxNum; j++) {
        if (isPrime(j, primes)) {
            primes.push(j);
        }
    }
    return primes
}

export const getIsDivisible = (num, root) => root % num === 0;
export const getIsOdd = (root) => root % 2 !== 0;

// must be able to multiply by 2 since 2 is the largest whole factor of any number
export const getSmallestFactor = (root) => {
    let factor = 0;
    for (let j = 2; j <= root; j++) {
        if (getIsDivisible(j, root)) {
            factor = j
            break
        }
    }
    return factor
}

export const getLargestFactor = (root) => {
    const smallest = getSmallestFactor(root)
    return root / smallest
}

export const getAllPrimeFactors = (root, arr = []) => {
    const smallest = getSmallestFactor(root)
    const remainder = root / smallest;
    arr.push(smallest);
    if (remainder > 1) {
        return getAllPrimeFactors(remainder, arr);
    }
    return arr;
}

export const getAllFactorPairs = (root, isProper) => {
    let factors = []
    let max = root;
    for (let i = 1; i < max; i++) {
        if (getIsDivisible(i, root)) {
            max = root / i;
            if (isProper && max === root && i !== root) {
                factors.push(i)
            } else if (isProper && i === max) {
                factors.push(i)
            } else {
                factors.push(i, max)
            }
        }
    }
    return factors;
}

export const getAllProperDivisors = (root) => {
    let factors = []
    const step = getIsOdd(root) ? 2 : 1;
    let max = Math.floor(Math.sqrt(root));
    if (max * max === root) {
        factors.push(max);
        max = max - 1
    }

    for (let i = 1; i < max; i += step) {
        if (getIsDivisible(i, root)) {
            const n = root / i;
            if (i === n || i === 1) {
                factors.push(i);
            } else {
                factors.push(i, n)
            }
        }
    }
    return factors
}

export const getSumOfProperDivisors = (num) => {
    const divisorArray = getAllFactorPairs(num, true);
    return getArraySum(divisorArray)
}

export const isPalindrome = (val) => {
    const valString = val.toString();
    const stringLength = valString.length - 1;
    const halfLength = Math.floor(stringLength / 2)
    let isGood = true;
    for (let i = 0; i <= halfLength; i++) {
        if (valString[i] !== valString[stringLength - i]) {
            isGood = false;
            break;
        }
    }
    return isGood;
}