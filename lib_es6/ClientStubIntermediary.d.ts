import { BaseArgsType, BaseResultType, __ClientStubResultType } from './types';
export default class ClientStubIntermediary {
    private resultHandlerPool;
    private worker;
    constructor();
    handleMessage(message: MessageEvent): void;
    setWorker(worker: Worker): void;
    sendWork<_TaskName extends string, _ArgsType extends BaseArgsType, _ResultType extends BaseResultType>(jobId: string, onSuccess: (result: _ResultType & __ClientStubResultType) => void, onError: (error: Error) => void, args: _ArgsType, taskName: _TaskName): void;
}
