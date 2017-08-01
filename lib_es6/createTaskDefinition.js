"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
function createTaskDefinition(taskName, clientStubintermediary, workFunc) {
    return {
        sendWork: (args) => new Promise((resolve, reject) => {
            const jobId = uuid.v4();
            clientStubintermediary.sendWork(jobId, resolve, reject, args, taskName);
        }),
        doWork: workFunc,
        taskName,
    };
}
exports.default = createTaskDefinition;
