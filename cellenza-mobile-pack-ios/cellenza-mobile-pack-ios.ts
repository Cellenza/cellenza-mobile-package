import tl = require('vsts-task-lib/task');
//npm install vsts-task-lib

// Get task parameters
let bundleFilePath: string = tl.getPathInput('bundleFilePath', true, true);
let extractDirectoryPath: string = tl.getInput('extractDirectoryPath', true);
let certificateName: string = tl.getInput('certificateName', true);
let provisioningId: string = tl.getInput('provisioningId', true);

async function run() {
    try {
        //do your actions
        tl.debug('bundleFilePath:' + bundleFilePath);
        tl.debug('extractDirectoryPath:' + extractDirectoryPath);
        tl.debug('certificateName:' + certificateName);
        tl.debug('provisioningId:' + provisioningId);

        var provisioningProfileRootPath = '';
        var payloadAppPath = extractDirectoryPath + '/Payload/*.app/';

        var profisioningProfile = provisioningProfileRootPath + '/' + provisioningId + '.mobileprovision';

        await tl.exec('cp', profisioningProfile + ' ' + payloadAppPath + 'embedded.mobileprovision');

    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
