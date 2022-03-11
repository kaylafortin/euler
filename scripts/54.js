import path from 'path';
import { ROOT_DIR } from './constants.js';
import { getFileRows } from './utils.js';
import fs from 'fs';

const DATA_DIR = path.join(ROOT_DIR, '/data');

const RAW_POKER_FILE = path.join(DATA_DIR, '54_poker.txt');
const DATA_FILE = path.join(DATA_DIR, '54.js')

const RAW_POKER_HANDS = getFileRows(RAW_POKER_FILE);

// convert text file to parsable poker hands
// first 5 cards - player 1 array.
// second 5 cards - player 2 array


const parsePokerHands = () => {
    let playerOne = [];
    let playerTwo = [];

    RAW_POKER_HANDS.forEach((hand) => {
        const cards = hand.split(' ');
        const playerOneHand = cards.slice(0, 5);
        const playerTwoHand = cards.slice(5)
        playerOne.push(playerOneHand)
        playerTwo.push(playerTwoHand)
    })

    if (playerOne.length !== playerTwo.length && playerOne.length !== RAW_POKER_HANDS.length) {
        console.log('Error! - error parsing poker hands')
        return null;
    }

    const data = `export const POKER_HANDS = ${JSON.stringify({
        playerOne,
        playerTwo
    })}`

    fs.writeFileSync(DATA_FILE, data)
}


parsePokerHands()