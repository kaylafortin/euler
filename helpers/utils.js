// step one - get primes

export const getArraySum = (arr) => arr.reduce((acc, num) => {
    acc += num;
    return acc;
}, 0)

export const getArrayProduct = (arr) => arr.reduce((acc, num) => {
    const newVal = acc * num;
    acc += newVal;
    return acc;
}, 1)

export const isPrime = num => {
    if (num === 1 || num === 2) return false;
    let isPrime = true
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            isPrime = false;
            break
        }
    }
    return isPrime;
}

export const getPrimes = (minNum, maxNum) => {
    let primes = []
    for (let j = minNum; j <= maxNum; j++) {
        if (isPrime(j)) {
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

export const getAllFactors = (root, arr = []) => {
    const smallest = getSmallestFactor(root)
    const remainder = root / smallest;
    // console.log(smallest, remainder)
    arr.push(smallest);
    if (remainder > 1) {
        return getAllFactors(remainder, arr);
    }
    return arr;
}



