import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { ROOT_DIR, SCRIPTS_DIR, NEW_LINE, TABLE_DELIMINATOR, LOG } from './constants.js'
import {
    getSolutionFiles,
    getProblemNumber,
    getFileRows,
    getTimeInMilliseconds,
    getMSTimeStr,
    withAverageTime, withRecordAnswers, getNumArg, getSolutionPath
} from './utils.js';


const answerPath = path.join(ROOT_DIR, 'answers.txt')
const execSolutionPath = path.join(SCRIPTS_DIR, 'solution.js')
const averagePath = path.join(SCRIPTS_DIR, 'average.js')

const TIME = 'time';
const AVERAGE = 'average'
const SOLUTION = 'solution'
const solutionRegex = /(?<=solution.*:\s*)(\S\d*\w*.*)(?=\n)/g;
const TABLE_SPLIT = /\s*\|*\s/
const MIN_ANSWER_LENGTH = 15;
const MIN_NUM_LENGTH = 4
const MIN_TIME_LENGTH = 12

const args = process.argv.slice(2)


const getExistingAnswers = () => {
    const lines = getFileRows(answerPath);
    if (!lines) return {}
    return lines.reduce((acc, line) => {
        const [number, result, time, average] = line.split(TABLE_SPLIT)
        if (number !== '') {
            acc[number] = {
                result,
                time,
                average
            }
        }
        return acc
    }, {})
}

const getAverageSolutionTime = (num) => {
    const averages = execSync(`node ${averagePath} ${num}`, {
        stdio: 'pipe',
        encoding: 'utf8'
    })
    const { solution } = JSON.parse(averages);
    return solution
}

const compareSolutionTime = (num, time) => {
    const average = getAverageSolutionTime(num);
    // const realTime = getTimeInMilliseconds({ time });
    return getMSTimeStr(average)
}

// compare new and stored answer and return new answer
const getAnswer = ({ num, solution, answerKey }) => {
    const [result, time] = solution.match(solutionRegex)
    const storedAnswer = answerKey[num];
    // if an answer has been recorded already
    if (!!storedAnswer && storedAnswer.result !== result) {
        console.log('oh no!')
        console.log(`check the result for problem #${num}`)
        console.log(`${storedAnswer.result} !== ${result}`)
        if (withRecordAnswers(process)) process.exit(1)
    }

    const average = compareSolutionTime(num, time)
    return { num, result, time, average }
}

const sortByTime = (answerKey) => (a, b) => getTimeInMilliseconds(answerKey[a]) - getTimeInMilliseconds(answerKey[b])
const sortByAverage = (answerKey) => (a, b) => {
    const { average: aTime } = answerKey[a];
    const { average: bTime } = answerKey[b]
    return getTimeInMilliseconds({ time: aTime }) - getTimeInMilliseconds({ time: bTime })
}
const getSortByFunc = (answerKey) => {
    const isSortByTime = args.includes(TIME);
    if (isSortByTime) return sortByTime(answerKey);
    const isSortAverage = withAverageTime(process);
    if (isSortAverage) return sortByAverage(answerKey)
    return (a, b) => Number(a) - Number(b);
}


const sortTable = (answerKey) => {
    const keyArray = Object.keys(answerKey)
    const sortBy = getSortByFunc(answerKey)
    return keyArray.sort(sortBy)
}

const getNumCell = (num) => {
    const numStr = num.toString();
    const space = MIN_NUM_LENGTH - numStr.length;
    return numStr + ` `.repeat(space)
}
const getResultCell = (result) => {
    const resultStr = result.toString();
    const space = MIN_ANSWER_LENGTH - resultStr.length;
    if (space < 0) console.log('Warning! Increase result cell size')
    return resultStr + ` `.repeat(space)
}

const getTimeCell = time => {
    if (!time) return;
    const space = MIN_TIME_LENGTH - time.length;
    if (space < 0) console.log('Warning! Increase time cell size')
    return time + ` `.repeat(space)
}
const getTableRow = ({ num, result, time, average }) => [
    getNumCell(num), getResultCell(result), getTimeCell(time), getTimeCell(average)
].join(TABLE_DELIMINATOR) + NEW_LINE

const getHeading = () => getTableRow({ num: '', result: 'answer', average: AVERAGE, time: TIME })

const buildAnswerTable = (answerKey) =>
    sortTable(answerKey).reduce((acc, num) => {
        const { result, time, average } = answerKey[num];
        acc += getTableRow({ num, result, time, average });
        return acc;
    }, getHeading())


/**
 * easier to replace file,
 * create log files to record average time
 */
try {
    const fileNum = getNumArg();
    const answerKey = getExistingAnswers();

    // add old answers in case not re-running all files
    let newAnswers = {
        ...answerKey,
    };
    // if file num arg provided, just run that file
    const solutionFiles = !!fileNum ? [`${fileNum}.js`] : await getSolutionFiles();
    for (const file of solutionFiles) {
        try {
            const num = getProblemNumber(file);
            const solution = execSync(`node ${execSolutionPath} ${LOG} ${num}`, {
                stdio: 'pipe',
                encoding: 'utf8'
            })
            newAnswers[num] = getAnswer({ num, solution, answerKey })
        } catch (e) {
            console.error(e.stdout)
        }
    }
    const answerTable = buildAnswerTable(newAnswers);
    console.log(answerTable)
    if (withRecordAnswers(process)) fs.writeFileSync(answerPath, answerTable)
} catch (err) {
    console.error(err);
}
