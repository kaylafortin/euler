// step one - get primes

export const getArraySum = (arr) => arr.reduce((acc, num) => {
    acc += num;
    return acc;
}, 0)

export const getArrayProduct = (arr) => arr.reduce((acc, num) => {
    return acc * Number(num);
}, 1)

export const getDigitsOfNumberSum = (num) => {
    const str = typeof (num) !== 'string' ? num.toString() : num;
    const digitsArray = str.split('').map((item) => Number(item) || 0);
    return getArraySum(digitsArray);
}

export const getFactorial = num => {
    let sum = BigInt(1)
    for (let i = num; i > 0; i--) {
        sum = BigInt(sum) * BigInt(i)
    }
    return BigInt(sum);
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
    if (!list) {
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                isPrime = false;
                break
            }
        }

    } else {
        for (let i = 0; i < list.length; i++) {
            if (list[i] >= num) {
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


export const getPrimes = (minNum, maxNum) => {
    let primes = []
    for (let j = minNum; j <= maxNum; j++) {
        if (isPrime(j, primes)) {
            primes.push(j);
        }
    }
    return primes
}

export const getIsDivisible = (num, root) => root % num === 0;

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

export const getAllFactorPairs = (root) => {
    let factors = []
    let max = root;
    for (let i = 1; i < max; i++) {
        if (getIsDivisible(i, root)) {
            max = root / i;
            factors.push(i, max)
        }
    }
    return factors;
}

