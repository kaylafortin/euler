const TEST_ARGS = {};
const ARGS = {};
const TEST_ANSWER = 0;


export const template = (args, testingArgs, testAnswer, solution) => {
    console.time("test time");
    const controlAnswer = solution(testingArgs)
    console.timeEnd("test time");
    const isTestCorrect = controlAnswer === testAnswer;
    console.log('control test is correct? ', isTestCorrect)
    if (isTestCorrect) {
        console.time("solution time");
        const answer = solution(args)
        console.log('solution: ', answer);
        console.timeEnd("solution time");
    }
}
// test(ARGS, TEST_ARGS, TEST_ANSWER)