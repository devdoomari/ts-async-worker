/// <reference types="stacktrace-js" />
import * as stacktrace from 'stacktrace-js';
export default class RemoteError extends Error implements IRemoteError {
    stackFrames: stacktrace.StackFrame[];
    originalErrorType: string;
    constructor(remoteErrorObj: IRemoteError);
}
export interface IRemoteError {
    stackFrames: stacktrace.StackFrame[];
    originalErrorType: string;
    message: string;
}
export declare function toIRemoteError(error: Error): Promise<IRemoteError>;
