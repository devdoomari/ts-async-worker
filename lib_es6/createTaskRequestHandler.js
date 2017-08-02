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
const RemoteError_1 = require("./RemoteError");
function createTaskRequestHandler(workerGroup) {
    return (taskRequest) => __awaiter(this, void 0, void 0, function* () {
        try {
            const worker = workerGroup[taskRequest.taskName];
            const result = yield worker(taskRequest.args);
            return {
                result,
                taskName: taskRequest.taskName,
                jobId: taskRequest.jobId,
                __TaskResponseMessageType: null,
            };
        }
        catch (originalError) {
            const remoteError = yield RemoteError_1.toIRemoteError(originalError);
            return {
                remoteError,
                taskName: taskRequest.taskName,
                jobId: taskRequest.jobId,
                __TaskResponseMessageType: null,
            };
        }
    });
}
exports.default = createTaskRequestHandler;
