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
// declare var postMessage: (message: any) => any;
function createTaskRequestMessageHandler(taskRequestHandler) {
    var _this = this;

    return function (message) {
        return __awaiter(_this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var dataStr, taskRequest, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dataStr = message.data;
                            taskRequest = JSON.parse(dataStr);
                            _context.next = 4;
                            return taskRequestHandler(taskRequest);

                        case 4:
                            result = _context.sent;

                            // debugger;
                            postMessage(result);

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    };
}
exports["default"] = createTaskRequestMessageHandler;