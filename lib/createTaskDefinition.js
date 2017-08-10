"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid");
function createTaskDefinition(taskName, clientStubintermediary, workFunc) {
    return {
        sendWork: function sendWork(args) {
            return new Promise(function (resolve, reject) {
                var jobId = uuid.v4();
                clientStubintermediary.sendWork(jobId, resolve, reject, args, taskName);
            });
        },
        doWork: workFunc,
        taskName: taskName
    };
}
exports["default"] = createTaskDefinition;