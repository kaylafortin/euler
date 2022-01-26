const TEST_ARGS = {};
const ARGS = {};
const TEST_ANSWER = 0;

export const template = (args, testingArgs, testAnswer, solution) => {
    let isTestCorrect;
    if (testAnswer !== null) {
        console.time("test time");
        const controlAnswer = solution(testingArgs)
        console.timeEnd("test time");
        isTestCorrect = controlAnswer === testAnswer;
        console.log('control test is correct? ', isTestCorrect)
        if (!isTestCorrect) {
            console.log('expected: ', testAnswer);
            console.log('actual: ', controlAnswer);
        }
    }
    if (testAnswer === null || isTestCorrect) {
        console.time("solution time");
        const answer = solution(args)
        console.log('solution: ', answer);
        console.timeEnd("solution time");
        return answer
    }
}