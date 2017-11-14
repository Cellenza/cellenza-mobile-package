import tl = require('vsts-task-lib/task');
//npm install vsts-task-lib

// Get task parameters
let bundleFilePath: string = tl.getPathInput('bundleFilePath', true, false);
let extractDirectoryPath: string = tl.getPathInput('extractDirectoryPath', true, true);
let certificateName: string = tl.getInput('certificateName', true);
let provisioningId: string = tl.getInput('provisioningId', true);
let entitlements: string = tl.getPathInput('entitlements', true, true);

var provisioningProfilePath = '';


async function signApp(directoryPath: string) {
    var profisioningProfile = provisioningProfilePath;

    await tl.cp(profisioningProfile, directoryPath + 'embedded.mobileprovision', '-f');
    await tl.exec('/usr/bin/codesign', '-vvvv --verify -fs "' + certificateName + '" --no-strict --entitlements=' + entitlements + ' ' + directoryPath);
}

async function zipFile(directoryPath: string) {
    await tl.exec('zip', '-qry ' + directoryPath + ' ' + bundleFilePath);
}

async function run() {
    try {
        //do your actions
        tl.debug('bundleFilePath:' + bundleFilePath);
        tl.debug('extractDirectoryPath:' + extractDirectoryPath);
        tl.debug('certificateName:' + certificateName);
        tl.debug('provisioningId:' + provisioningId);

        var paths = tl.findMatch('/Users/', ['**/' + provisioningId + '.mobileprovision']);

        for (var path in paths) {
            provisioningProfilePath = path;
        }

        tl.debug('Find Provisioning profile on :' + provisioningProfilePath);

        var paths = tl.find(extractDirectoryPath);

        for (var appPath in paths) {
            tl.debug('Find APP :' + appPath);

            await signApp(appPath);

            await zipFile(appPath);
        }
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
