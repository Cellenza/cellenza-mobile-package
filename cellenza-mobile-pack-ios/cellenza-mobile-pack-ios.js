"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("vsts-task-lib/task");
//npm install vsts-task-lib
// Get task parameters
let bundleFilePath = tl.getPathInput('bundleFilePath', true, false);
let extractDirectoryPath = tl.getPathInput('extractDirectoryPath', true, true);
let certificateName = tl.getInput('certificateName', true);
let provisioningId = tl.getInput('provisioningId', true);
let entitlements = tl.getPathInput('entitlements', true, true);
var provisioningProfilePath = '';
function signApp(directoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        var profisioningProfile = provisioningProfilePath;
        yield tl.cp(profisioningProfile, directoryPath + 'embedded.mobileprovision', '-f');
        yield tl.exec('/usr/bin/codesign', '-vvvv --verify -fs "' + certificateName + '" --no-strict --entitlements=' + entitlements + ' ' + directoryPath);
    });
}
function zipFile(directoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield tl.exec('zip', '-qry ' + directoryPath + ' ' + bundleFilePath);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //do your actions
            tl.debug('bundleFilePath:' + bundleFilePath);
            tl.debug('extractDirectoryPath:' + extractDirectoryPath);
            tl.debug('certificateName:' + certificateName);
            tl.debug('provisioningId:' + provisioningId);
            var user = tl.getVariable('USER');
            provisioningProfilePath = '/Users/' +
                user +
                '/Library/MobileDevice/Provisioning Profiles/' +
                provisioningId +
                '.mobileprovision';
            tl.debug('Use provisioning profile :' + provisioningProfilePath);
            var paths = tl.find(extractDirectoryPath);
            for (var appPath in paths) {
                tl.debug('Find APP :' + appPath);
                yield signApp(appPath);
                yield zipFile(appPath);
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
