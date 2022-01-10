import { getLogFilePath, getRequiredNumArg, getFileRows, getTimeFromSolution } from './utils.js';


/**
 * get log file for a solution
 * return average test time and average solution time
 */

const getAverageTime = (arr) => Math.round(
    arr.reduce((acc, num) => acc + Number(num), 0)
    / arr.length
    * 1000
) / 1000

const getAverageTimeInMilliseconds = ({ test, solution }) => {
    const testTime = getAverageTime(test)
    return ({
        test: testTime,
        solution: getAverageTime(solution) || testTime // handle case where no test scenario
    })
}

try {
    const num = getRequiredNumArg(process);
    const logFilePath = getLogFilePath(num);
    const lines = getFileRows(logFilePath);
    if (!lines) {
        console.log(`No logs found for problem #${num}`)
        process.exit(9)
    }
    const averages = lines.reduce((acc, line) => {
        const { test, solution } = getTimeFromSolution(line);
        if (!!test) acc.test.push(test)
        if (!!solution) acc.solution.push(solution);
        return acc
    }, {
        test: [],
        solution: [],
    })

    console.log(JSON.stringify(getAverageTimeInMilliseconds(averages)))

} catch (e) {
    console.log('ERROR!')
    console.log(e)
}