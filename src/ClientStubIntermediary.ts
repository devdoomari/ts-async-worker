import {
  BaseArgsType,
  BaseResultType,
  __ClientStubResultType,
  TaskResponseType,
  TaskRequestType,
} from './types';
import RemoteError, {

} from './RemoteError';

export default class ClientStubIntermediary {
  private resultHandlerPool: {
    [jobId: string]: {
      onSuccess: (result: BaseResultType) => void,
      onError: (error: Error) => void,
      args: BaseArgsType,
      taskName: string,
    }
  };
  private worker: Worker;
  constructor() {

    this.resultHandlerPool = {};
    this.handleMessage.bind(this);
    this.sendWork.bind(this);
  }
  handleMessage(message: MessageEvent) {
    const taskResponse: TaskResponseType = message.data;
    const resultHandler = this.resultHandlerPool[taskResponse.jobId];
    if (taskResponse.remoteError) {
      // FIXME: fix RemoteError type... looks confusing below.
      //    (OR: something like DTO?)
      const remoteError = new RemoteError(taskResponse.remoteError);
      resultHandler.onError(remoteError);
    } else {
      resultHandler.onSuccess(taskResponse.result);
    }
  }
  setWorker(worker: Worker) { // needs better 'worker'
    this.worker = worker;
    this.worker.addEventListener('message', this.handleMessage.bind(this));
  }
  sendWork<
    _TaskName extends string,
    _ArgsType extends BaseArgsType,
    _ResultType extends BaseResultType
  >(
    jobId: string,
    onSuccess: (result: _ResultType & __ClientStubResultType) => void,
    onError: (error: Error) => void,
    args: _ArgsType,
    taskName: _TaskName,
  ) {
    this.resultHandlerPool[jobId] = {
      onSuccess, onError,
      args, taskName,
    };
    const taskRequest: TaskRequestType<
      _TaskName,
      _ArgsType
    > = {
      __TaskRequestMessageType: null,
      taskName,
      args,
      jobId,
    }
    this.worker.postMessage(JSON.stringify(taskRequest));
  }
}