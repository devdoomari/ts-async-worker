"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RemoteError_1 = require("./RemoteError");
class ClientStubIntermediary {
    constructor() {
        this.resultHandlerPool = {};
        this.handleMessage.bind(this);
        this.sendWork.bind(this);
    }
    handleMessage(message) {
        const taskResponse = message.data;
        const resultHandler = this.resultHandlerPool[taskResponse.jobId];
        if (taskResponse.remoteError) {
            // FIXME: fix RemoteError type... looks confusing below.
            //    (OR: something like DTO?)
            const remoteError = new RemoteError_1.default(taskResponse.remoteError);
            resultHandler.onError(remoteError);
        }
        else {
            resultHandler.onSuccess(taskResponse.result);
        }
        delete this.resultHandlerPool[taskResponse.jobId];
    }
    setWorker(worker) {
        this.worker = worker;
        this.worker.addEventListener('message', this.handleMessage.bind(this));
    }
    sendWork(jobId, onSuccess, onError, args, taskName) {
        this.resultHandlerPool[jobId] = {
            onSuccess, onError,
            args, taskName,
        };
        const taskRequest = {
            __TaskRequestMessageType: null,
            taskName,
            args,
            jobId,
        };
        this.worker.postMessage(JSON.stringify(taskRequest));
    }
}
exports.default = ClientStubIntermediary;
