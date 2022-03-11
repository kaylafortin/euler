import { POKER_HANDS } from '../data/54.js'
import { template } from '../helpers/template.js';

/**
 * In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:

 High Card: Highest value card.
 One Pair: Two cards of the same value.
 Two Pairs: Two different pairs.
 Three of a Kind: Three cards of the same value.
 Straight: All cards are consecutive values.
 Flush: All cards of the same suit.
 Full House: Three of a kind and a pair.
 Four of a Kind: Four cards of the same value.
 Straight Flush: All cards are consecutive values of same suit.
 Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
 The cards are valued in the order:
 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

 If two players have the same ranked hands then the rank made up of the highest value wins; for example, a pair of eights beats a pair of fives (see example 1 below).
 But if two ranks tie, for example, both players have a pair of queens, then highest cards in each hand are compared (see example 4 below);
 if the highest cards tie then the next highest cards are compared, and so on.

 The file, poker.txt, contains one-thousand random hands dealt to two players. Each line of the file contains ten cards (separated by a single space):
 the first five are Player 1's cards and the last five are Player 2's cards. You can assume that all hands are valid (no invalid characters or repeated cards),
 each player's hand is in no specific order, and in each hand there is a clear winner.

 How many hands does Player 1 win?
 */

const TEST_ANSWER = 3;

const TEST_ARGS = {
    playerOne: [
        ['5H', '5C', '6S', '7S', 'KD'],
        ['5D', '8C', '9S', 'JS', 'AC'], // player 1 wins
        ['2D', '9C', 'AS', 'AH', 'AC'],
        ['4D', '6S', '9H', 'QH', 'QC'], // player 1 wins
        ['2H', '2D', '4C', '4D', '4S']  // player 1 wins
    ],
    playerTwo: [
        ['2C', '3S', '8S', '8D', 'TD'], // player 2 wins
        ['2C', '5C', '7D', '8S', 'QH'],
        ['3D', '6D', '7D', 'TD', 'QD'], // player 2 wins
        ['3D', '6D', '7H', 'QD', 'QS'],
        ['3C', '3D', '3S', '9S', '9D'],
    ]
}

const ARGS = {
    ...POKER_HANDS,
}

const CARD_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const HANDS = {
    HIGH_CARD: 'HIGH_CARD',
    ONE_PAIR: 'ONE_PAIR',
    TWO_PAIR: 'TWO_PAIR',
    THREE_OF_KIND: 'THREE_OF_KIND',
    FOUR_OF_KIND: 'FOUR_OF_KIND',
    STRAIGHT: 'STRAIGHT',
    FLUSH: 'FLUSH',
    FULL_HOUSE: 'FULL_HOUSE',
    STRAIGHT_FLUSH: 'STRAIGHT_FLUSH',
    ROYAL_FLUSH: 'ROYAL_FLUSH',
}

const HAND_ORDER = [
    HANDS.HIGH_CARD,
    HANDS.ONE_PAIR,
    HANDS.TWO_PAIR,
    HANDS.THREE_OF_KIND,
    HANDS.STRAIGHT,
    HANDS.FLUSH,
    HANDS.FULL_HOUSE,
    HANDS.FOUR_OF_KIND,
    HANDS.STRAIGHT_FLUSH,
    HANDS.ROYAL_FLUSH
]

const getSuit = (card) => card.substring(1)
const getCardValue = (card) => card.substring(0, 1);

const compareCards = (cardA, cardB) => {
    const cardValueA = getCardValue(cardA);
    const cardValueB = getCardValue(cardB);
    const a = CARD_ORDER.indexOf(cardValueA);
    const b = CARD_ORDER.indexOf(cardValueB);
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

const compareHandRanking = (rankingA, rankingB) => {
    const a = HAND_ORDER.indexOf(rankingA);
    const b = HAND_ORDER.indexOf(rankingB);
    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

const getOrderedHand = (hand) => hand.sort(compareCards)

const getIsFlush = (hand) => {
    let isFlush = true;
    let suit;
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (!suit) {
            suit = getSuit(card);
        } else if (suit !== getSuit(card)) {
            isFlush = false;
            break;
        }
    }
    return isFlush
}

const getIsStraight = (hand) => {
    const orderedHand = getOrderedHand(hand);
    let currentIndex;
    let isStraight = true;
    for (let i = 0; i < orderedHand.length; i++) {
        const card = orderedHand[i];
        const cardValue = getCardValue(card);
        if (!currentIndex) {
            currentIndex = CARD_ORDER.indexOf(cardValue);
            continue
        }
        if (cardValue !== CARD_ORDER[currentIndex + 1]) {
            isStraight = false;
            break
        }
        currentIndex++
    }

    return isStraight;
}

// high card, pairs
const getXOfAKind = (hand) => {
    const orderedHand = getOrderedHand(hand);
    const handCount = hand.reduce((acc, card) => {
        const value = getCardValue(card);
        if (!acc[value]) acc[value] = 1;
        else acc[value] += 1;
        return acc;
    }, {});
    return Object.keys(handCount).reduce((acc, val) => {
            const count = handCount[val];
            switch (count) {
                case 1: {
                    // if no high card set or if new val is greater than old one
                    if (!acc[HANDS.HIGH_CARD] || (CARD_ORDER.indexOf(val) > CARD_ORDER.indexOf(acc[HANDS.HIGH_CARD]))) {
                        acc[HANDS.HIGH_CARD] = val;
                    }
                    break;
                }
                case 2: {
                    if (acc[HANDS.ONE_PAIR]) {
                        acc[HANDS.TWO_PAIR] = val;
                    } else {
                        acc[HANDS.ONE_PAIR] = val
                        if (acc[HANDS.THREE_OF_KIND]) {
                            acc[HANDS.FULL_HOUSE] = true
                        }
                    }
                    break
                }
                case 3: {
                    acc[HANDS.THREE_OF_KIND] = val;
                    if (acc[HANDS.ONE_PAIR]) {
                        acc[HANDS.FULL_HOUSE] = true
                    }
                    break
                }
                case 4: {
                    acc[HANDS.FOUR_OF_KIND] = val;
                    break
                }
            }
            return acc;
        }, {}
    )
}

const getHandValue = (hand) => ({
    ...getXOfAKind(hand),
    [HANDS.STRAIGHT]: getIsStraight(hand),
    [HANDS.FLUSH]: getIsFlush(hand),
})

const getOrderedHandValue = (handRankingObject) =>
    Object.keys(handRankingObject)
        .filter((key) => !!handRankingObject[key])
        .sort(compareHandRanking)


const compareHands = (playerOneHand, playerTwoHand) => {
    const playerOneRankingObject = getHandValue(playerOneHand)
    const playerOneOrderedHand = getOrderedHandValue(playerOneRankingObject)

    const playerTwoRankingObject = getHandValue(playerTwoHand);
    const playerTwoOrderedHand = getOrderedHandValue(playerTwoRankingObject);


    for (let i = 0; i < playerOneOrderedHand.length; i++) {
        const playerOneRank = playerOneOrderedHand[i];
        const playerTwoRank = playerTwoOrderedHand[i]
        const playerOneRankIndex = HAND_ORDER.indexOf(playerOneRank);
        const playerTwoRankIndex = HAND_ORDER.indexOf(playerTwoRank);
        if (playerTwoRankIndex !== playerOneRankIndex) return playerOneRankIndex > playerTwoRankIndex;

        // in the case the ranks are equal - compare card value
        const playerOneCardValue = playerOneRankingObject[playerOneRank];
        const playerTwoCardValue = playerTwoRankingObject[playerTwoRank];

        // if the rank and cards are equal, move on to next highest rank
        if (playerOneCardValue === playerTwoCardValue) continue;

        return CARD_ORDER.indexOf(playerOneCardValue) > CARD_ORDER.indexOf(playerTwoCardValue)

    }
}


const solution = ({ playerOne, playerTwo }) => {
    let count = 0;
    for (let i = 0; i < playerOne.length; i++) {
        const isPlayerOneWinner = compareHands(playerOne[i], playerTwo[i]);
        if (isPlayerOneWinner) {
            count++
        }
    }
    return count
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)