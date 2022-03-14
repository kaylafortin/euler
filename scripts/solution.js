import { execSync } from 'child_process';
import {
    getArgs,
    getCacheFilePath,
    getMSTimeStr, getNumArg,
    getRequiredNumArg,
    getSolutionPath,
    getTimeFromSolution,
    withAverageTime, withLogs
} from './utils.js';
import fs from 'fs';
import { NEW_LINE, TABLE_DELIMINATOR } from './constants.js';


const formatLogData = ({ num, data }) => {
    const date = new Date();
    const cells = data.split(NEW_LINE);
    const row = [num, date.toLocaleDateString(), date.toLocaleTimeString(), ...cells].join(TABLE_DELIMINATOR)
    return NEW_LINE + row
}

const writeToLogFile = ({ num, data }) => {
    const path = getCacheFilePath(num);
    fs.appendFile(path, formatLogData({ num, data }), (err) => {
        if (err) throw err;
    });
}

const getAverage = ({ num, data }) => {
    try {
        const { solution: solutionAverage } = JSON.parse(process.argv[process.argv.length - 2]);
        const { solution } = getTimeFromSolution(data, NEW_LINE);
        const difference = solutionAverage > solution ? solutionAverage - solution : solution - solutionAverage;
        const differenceStr = getMSTimeStr(difference)
        if (solutionAverage > solution) {
            console.log(`oh no! solution for #${num} was slower than average by ${differenceStr}`);
        } else {
            console.log(`yay! solution for #${num} was faster than average by ${differenceStr}`);
        }
    } catch (e) {

    }
}


try {
    const num = getRequiredNumArg(process);
    const pathname = getSolutionPath(num)
    if (!fs.existsSync(pathname)) {
        console.log(`No solution found for problem #${num}`)
        process.exit(9)
    }
    const data = execSync(`node ${pathname} ${num}`, {
        stdio: 'pipe',
        encoding: 'utf8'
    })
    console.log(data);
    if (withLogs(process)) writeToLogFile({ num, data })
    if (withAverageTime(process)) getAverage({ num, data })
} catch (e) {
    console.log('ERROR!')
    console.log(e)
}

