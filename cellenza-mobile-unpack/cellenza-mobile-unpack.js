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
let bundleFilePath = tl.getPathInput('bundleFilePath', true, true);
let applicationType = tl.getInput('applicationType', true);
let extractDirectoryPath = tl.getInput('extractDirectoryPath', true);
function runios() {
    return __awaiter(this, void 0, void 0, function* () {
        yield tl.exec('unzip', '-qq ' + bundleFilePath + ' -d ' + extractDirectoryPath);
    });
}
function runAndroid() {
    return __awaiter(this, void 0, void 0, function* () {
        yield tl.exec('unzip', '-qq ' + bundleFilePath + ' -d ' + extractDirectoryPath);
    });
}
function runUwp() {
    return __awaiter(this, void 0, void 0, function* () {
        tl.debug('UWP : Not implemented');
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //do your actions
            tl.debug('applicationType:' + applicationType);
            tl.debug('bundleFilePath:' + bundleFilePath);
            tl.debug('extractDirectoryPath:' + extractDirectoryPath);
            if (applicationType === "iOS") {
                yield runios();
            }
            else if (applicationType === "Android") {
                yield runAndroid();
            }
            else if (applicationType === "UWP") {
                yield runUwp();
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
