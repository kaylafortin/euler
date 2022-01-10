import fs from 'fs';
import path from 'path';
import { CACHE_DIR, NEW_LINE, SOLUTIONS_DIR, MS, TABLE_DELIMINATOR, AVERAGE, timeRegex, LOG } from './constants.js';


export const getProblemNumber = (file) => {
    const [problemNumber] = file.split('.');
    return problemNumber;
}

export const getSolutionFiles = async () => fs.readdirSync(SOLUTIONS_DIR);

export const getSolutionPath = (num) => path.join(SOLUTIONS_DIR, `${num}.js`);
export const getLogFilePath = (num) => path.join(CACHE_DIR, `${num}.log`);

export const getCacheFilePath = (num) => {
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR);
    }
    return getLogFilePath(num);
}

export const getArgs = (subprocess) => subprocess.argv.slice(2);

export const getNumArg = () => {
    const args = getArgs(process)
    const num = args[args.length - 1];
    return isNaN(Number(num)) ? null : num
}

export const getRequiredNumArg = (subprocess) => {
    const num = getNumArg(subprocess);
    if (!num) {
        console.log('Error! No problem number provided')
        subprocess.exit(9)
    }
    return num
}

export const getFileRows = (filePath) => {
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split(NEW_LINE).filter(Boolean);
}

export const getTimeInMilliseconds = ({ time }) => {
    const isMilliseconds = time.indexOf(MS) > 0;
    const [val] = time.split(isMilliseconds ? MS : 's');
    if (isNaN(val)) return
    // if time in seconds multiply by 1000
    return Number(val) * (isMilliseconds ? 1 : 1000)
}

const getTime = (timeString) => {
    if (!timeString) return null;
    const time = timeString.match(timeRegex)[0];
    return getTimeInMilliseconds({ time })
}

export const getTimeFromSolution = (templateOutput, deliminator = TABLE_DELIMINATOR) => {
    const row = templateOutput.split(deliminator)
    const [testTime, solutionTime] = row.filter((cell) => cell.match(timeRegex));
    return { test: getTime(testTime), solution: getTime(solutionTime) }
}

export const getMSTimeStr = (time) => `${Math.round(Number(time) * 1000) / 1000}${MS}`;

export const withAverageTime = (subprocess) => getArgs(subprocess).includes(AVERAGE);
export const withLogs = (subprocess) => getArgs(subprocess).includes(LOG)
export const withRecordAnswers = (subprocess) => getArgs(subprocess).includes('record')