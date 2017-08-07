"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function createWorkerGroup() {
    for (var _len = arguments.length, taskDefinitions = Array(_len), _key = 0; _key < _len; _key++) {
        taskDefinitions[_key] = arguments[_key];
    }

    var workerGroup = lodash_1.reduce(taskDefinitions, function (result, taskDefinition, key) {
        var taskName = taskDefinition.taskName;
        return Object.assign({}, result, _defineProperty({}, taskName, taskDefinition.doWork));
    }, {});
    return workerGroup;
}
exports["default"] = createWorkerGroup;