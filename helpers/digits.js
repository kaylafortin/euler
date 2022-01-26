// number to test, array of digits (sometimes it includes 0 in digits)
export const getIsPanDigital = (num, digits) => {
    const numString = num.toString()
    for (let i = 0; i < numString.length; i++) {
        if (numString.indexOf(digits[i]) < 0) {
            return false
        }
    }
    return true
}