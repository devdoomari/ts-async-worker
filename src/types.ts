import {
  IRemoteError,
} from './RemoteError';
export type BaseArgsType = {
  __BaseArgsType: null,
};
export type BaseResultType = {
  __BaseResultType: null,
};
export type __ClientStubResultType = {
  __ClientStubResultType: null,
};
export type __ServerStubResultType = {
  __ServerStubResultType: null,
};


/*
  ServerWorker --> doActualWork (...) ? runWork? runTask? doWork ?
  ClientStub ----> sendWork( ... ) ?
*/

export type DoWorkType<
  _TaskName extends string,
  _ArgsType extends BaseArgsType = BaseArgsType,
  _ResultType extends BaseResultType = BaseResultType,
> = (args: _ArgsType) => Promise<_ResultType & __ServerStubResultType>

export type SendWorkType<
  _Name extends string,
  _ArgsType extends BaseArgsType,
  _ResultType extends BaseResultType,
> = (args: _ArgsType) => Promise<_ResultType & __ClientStubResultType>

export type TaskDefinitionType<
  _TaskName extends string,
  _ArgsType extends BaseArgsType = BaseArgsType,
  _ResultType extends BaseResultType = BaseResultType,
> = {
  sendWork: SendWorkType<
    _TaskName,
    _ArgsType,
    _ResultType
  >,
  doWork: DoWorkType<
    _TaskName,
    _ArgsType,
    _ResultType
  >,
  taskName: _TaskName,
}

export type TaskRequestType<
  _TaskName extends string = string,
  _ArgsType extends BaseArgsType = BaseArgsType,
> = {
  __TaskRequestMessageType: null,
  taskName: _TaskName,
  args: _ArgsType,
  jobId: string,
}

export type TaskResponseType<
  _TaskName extends string = string,
  _ResultType extends BaseResultType = BaseResultType,
> = {
  __TaskResponseMessageType: null,
  taskName: _TaskName,
  result?: _ResultType,
  remoteError?: IRemoteError,
  jobId: string,
}

