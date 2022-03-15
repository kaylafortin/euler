import { template } from '../helpers/template.js';
import { ENCRYPTED_MESSAGE } from '../data/59.js'
import { getArraySum } from '../helpers/utils.js';

/**
 * Each character on a computer is assigned a unique code and the preferred standard is ASCII
 * (American Standard Code for Information Interchange). For example, uppercase A = 65, asterisk (*) = 42, and lowercase k = 107.

 A modern encryption method is to take a text file, convert the bytes to ASCII, then XOR each byte with a given value,
 taken from a secret key. The advantage with the XOR function is that using the same encryption key on the cipher text,
 restores the plain text; for example, 65 XOR 42 = 107, then 107 XOR 42 = 65.

 For unbreakable encryption, the key is the same length as the plain text message, and the key is made up of random bytes.
 The user would keep the encrypted message and the encryption key in different locations, and without both "halves", it is impossible to decrypt the message.

 Unfortunately, this method is impractical for most users, so the modified method is to use a password as a key.
 If the password is shorter than the message, which is likely, the key is repeated cyclically throughout the message.
 The balance for this method is using a sufficiently long password key for security, but short enough to be memorable.

 Your task has been made easy, as the encryption key consists of three lower case characters. Using p059_cipher.txt
 (right click and 'Save Link/Target As...'), a file containing the encrypted ASCII codes, and the knowledge that the plain text
 must contain common English words, decrypt the message and find the sum of the ASCII values in the original text
 */

const ARGS = {
    message: ENCRYPTED_MESSAGE,
}

const LOWER_CASE_ASCII_CODES = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
].map((val) => val.charCodeAt(0));


const getIsValidChar = (c) => (30 <= c && c <= 95) || (97 <= c && c <= 122);

const decryptMessageToAscii = (message, key) => message.map((char, index) => {
    const codeIndex = index % 3;
    return char ^ key[codeIndex];
})

const getMessageSum = (message, key) => {
    const decryptedMessage = decryptMessageToAscii(message, key);
    return getArraySum(decryptedMessage)
}

// const getDecryptedMessage = (message, key) => {
//     const decryptedMessage = decryptMessageToAscii(message, key).map((c) => String.fromCharCode(c));
//     return decryptedMessage.reduce((acc, c) => {
//         acc += c;
//         return acc
//     }, '')
// }

const getIsMessageValid = (message, codes) => {
    let isMessageValid = true
    for (let i = 0; i < message.length; i++) {
        const codeIndex = i % 3;
        const decodedChar = codes[codeIndex] ^ message[i];
        // console.log(codeIndex, message[i], decodedChar, getIsValidChar(decodedChar))
        if (!getIsValidChar(decodedChar)) {
            isMessageValid = false;
            break
        }
    }
    return isMessageValid;
}
const solution = ({ message }) => {
    let codes;
    for (let i = 0; i < LOWER_CASE_ASCII_CODES.length; i++) {
        for (let j = 0; j < LOWER_CASE_ASCII_CODES.length; j++) {
            for (let k = 0; k < LOWER_CASE_ASCII_CODES.length; k++) {
                const TEST_CODES = [LOWER_CASE_ASCII_CODES[i], LOWER_CASE_ASCII_CODES[j], LOWER_CASE_ASCII_CODES[k]]
                if (getIsMessageValid(message, TEST_CODES)) {
                    codes = TEST_CODES;
                    break
                }
            }
        }
    }

    return getMessageSum(message, codes)
}

template(ARGS, null, null, solution)