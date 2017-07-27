import * as uuid from 'uuid';
import {
  BaseArgsType,
  BaseResultType,
  TaskDefinitionType,
  __ServerStubResultType,
} from './types';
import ClientStubIntermediary from './ClientStubIntermediary';
export default function createTaskDefinition<
  _TaskName extends string,
  _ArgsType extends BaseArgsType,
  _ResultType extends BaseResultType
>(
  taskName: _TaskName,
  clientStubintermediary: ClientStubIntermediary,
  workFunc: (args: _ArgsType) => Promise<_ResultType & __ServerStubResultType>
): TaskDefinitionType<_TaskName, _ArgsType, _ResultType> {
  return {
    sendWork: (args: _ArgsType) => new Promise((resolve, reject) => {
      const jobId = uuid.v4();
      clientStubintermediary.sendWork<
        _TaskName,
        _ArgsType,
        _ResultType
      >(
        jobId, resolve, reject,
        args, taskName,
      );
    }),
    doWork: workFunc,
    taskName,
  };
}
