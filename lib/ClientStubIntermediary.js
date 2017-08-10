"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var RemoteError_1 = require("./RemoteError");

var ClientStubIntermediary = function () {
    function ClientStubIntermediary() {
        _classCallCheck(this, ClientStubIntermediary);

        this.resultHandlerPool = {};
        this.handleMessage.bind(this);
        this.sendWork.bind(this);
    }

    _createClass(ClientStubIntermediary, [{
        key: "handleMessage",
        value: function handleMessage(message) {
            var taskResponse = message.data;
            var resultHandler = this.resultHandlerPool[taskResponse.jobId];
            if (taskResponse.remoteError) {
                // FIXME: fix RemoteError type... looks confusing below.
                //    (OR: something like DTO?)
                var remoteError = new RemoteError_1["default"](taskResponse.remoteError);
                resultHandler.onError(remoteError);
            } else {
                resultHandler.onSuccess(taskResponse.result);
            }
            delete this.resultHandlerPool[taskResponse.jobId];
        }
    }, {
        key: "setWorker",
        value: function setWorker(worker) {
            this.worker = worker;
            this.worker.addEventListener('message', this.handleMessage.bind(this));
        }
    }, {
        key: "sendWork",
        value: function sendWork(jobId, onSuccess, onError, args, taskName) {
            this.resultHandlerPool[jobId] = {
                onSuccess: onSuccess, onError: onError,
                args: args, taskName: taskName
            };
            var taskRequest = {
                __TaskRequestMessageType: null,
                taskName: taskName,
                args: args,
                jobId: jobId
            };
            this.worker.postMessage(JSON.stringify(taskRequest));
        }
    }]);

    return ClientStubIntermediary;
}();

exports["default"] = ClientStubIntermediary;