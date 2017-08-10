"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function createWorkerGroup(...taskDefinitions) {
    const workerGroup = lodash_1.reduce(taskDefinitions, (result, taskDefinition, key) => {
        const taskName = taskDefinition.taskName;
        return Object.assign({}, result, { [taskName]: taskDefinition.doWork });
    }, {});
    return workerGroup;
}
exports.default = createWorkerGroup;
