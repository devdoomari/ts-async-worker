"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var stacktrace = require("stacktrace-js");

var RemoteError = function (_Error) {
    _inherits(RemoteError, _Error);

    function RemoteError(remoteErrorObj) {
        _classCallCheck(this, RemoteError);

        var _this = _possibleConstructorReturn(this, (RemoteError.__proto__ || Object.getPrototypeOf(RemoteError)).call(this, remoteErrorObj.message));

        _this.originalErrorType = remoteErrorObj.originalErrorType;
        _this.stackFrames = remoteErrorObj.stackFrames;
        _this.message = remoteErrorObj.message;
        return _this;
    }

    return RemoteError;
}(Error);

exports["default"] = RemoteError;
function toIRemoteError(error) {
    return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
        var stackFrames;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return stacktrace.fromError(error);

                    case 2:
                        stackFrames = _context.sent;
                        return _context.abrupt("return", {
                            message: error.message,
                            originalErrorType: error.constructor.name,
                            stackFrames: stackFrames
                        });

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exports.toIRemoteError = toIRemoteError;