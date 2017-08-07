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
const stacktrace = require("stacktrace-js");
class RemoteError extends Error {
    constructor(remoteErrorObj) {
        super(remoteErrorObj.message);
        this.originalErrorType = remoteErrorObj.originalErrorType;
        this.stackFrames = remoteErrorObj.stackFrames;
        this.message = remoteErrorObj.message;
    }
}
exports.default = RemoteError;
function toIRemoteError(error) {
    return __awaiter(this, void 0, void 0, function* () {
        const stackFrames = yield stacktrace.fromError(error);
        return {
            message: error.message,
            originalErrorType: error.constructor.name,
            stackFrames,
        };
    });
}
exports.toIRemoteError = toIRemoteError;
