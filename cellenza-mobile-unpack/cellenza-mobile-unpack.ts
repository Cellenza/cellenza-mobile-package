import tl = require('vsts-task-lib/task');
//npm install vsts-task-lib

// Get task parameters
let bundleFilePath: string = tl.getPathInput('bundleFilePath', true, true);
let applicationType: string = tl.getInput('applicationType', true);
let extractDirectoryPath: string = tl.getInput('extractDirectoryPath', true);


async function runios() {
    await tl.exec('unzip', '-qq ' + bundleFilePath + ' -d ' + extractDirectoryPath);
}

async function runAndroid() {
    tl.debug('Android : Not implemented');
}

async function runUwp() {
    tl.debug('UWP : Not implemented');
}


async function run() {
    try {
        //do your actions
        tl.debug('applicationType:' + applicationType);
        tl.debug('bundleFilePath:' + bundleFilePath);
        tl.debug('extractDirectoryPath:' + extractDirectoryPath);

        if (applicationType === "ios") {
            await runios();
        } else if (applicationType === "android") {
            await runAndroid();
        } else if (applicationType === "uwp") {
            await runUwp();
        }

    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
