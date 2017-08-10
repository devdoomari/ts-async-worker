"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var RemoteError_1 = require("./RemoteError");
function createTaskRequestHandler(workerGroup) {
    var _this = this;

    return function (taskRequest) {
        return __awaiter(_this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var worker, result, remoteError;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            worker = workerGroup[taskRequest.taskName];
                            _context.next = 4;
                            return worker(taskRequest.args);

                        case 4:
                            result = _context.sent;
                            return _context.abrupt("return", {
                                result: result,
                                taskName: taskRequest.taskName,
                                jobId: taskRequest.jobId,
                                __TaskResponseMessageType: null
                            });

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](0);
                            _context.next = 12;
                            return RemoteError_1.toIRemoteError(_context.t0);

                        case 12:
                            remoteError = _context.sent;
                            return _context.abrupt("return", {
                                remoteError: remoteError,
                                taskName: taskRequest.taskName,
                                jobId: taskRequest.jobId,
                                __TaskResponseMessageType: null
                            });

                        case 14:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 8]]);
        }));
    };
}
exports["default"] = createTaskRequestHandler;