import * as stacktrace from 'stacktrace-js';
export default class RemoteError extends Error implements IRemoteError {
  public stackFrames: stacktrace.StackFrame[];
  public originalErrorType: string;
  constructor(remoteErrorObj: IRemoteError) {
    super(remoteErrorObj.message);
    this.originalErrorType = remoteErrorObj.originalErrorType;
    this.stackFrames = remoteErrorObj.stackFrames;
    this.message = remoteErrorObj.message;
  }
}
export interface IRemoteError {
  stackFrames: stacktrace.StackFrame[];
  originalErrorType: string;
  message: string;
}

export async function toIRemoteError(error: Error): Promise<IRemoteError> {
  const stackFrames = await stacktrace.fromError(error);
  return {
    message: error.message,
    originalErrorType: error.constructor.name,
    stackFrames,
  };
}