import * as uuid from 'uuid';
import {
  BaseArgsType,
  BaseResultType,
  // TaskDefinitionType,
  __ServerStubResultType,
} from './types';
import {
  ClientSideBroker,
} from './brokers/ClientSideBroker';
import {
  BaseWorkerSideBroker,
} from './brokers/BaseWorkerSideBroker';
export default function createTaskDefinition<
  _TaskName extends string,
  _ArgsType extends BaseArgsType,
  _ResultType extends BaseResultType
>(
  taskName: _TaskName,
  workFunc: (args: _ArgsType) => Promise<_ResultType & __ServerStubResultType>
) {
  return {
    createClientSideStub(clientSideBroker: ClientSideBroker) {
      return (args: _ArgsType) => new Promise((resolve, reject) => {
        const jobId = uuid.v4();
        clientSideBroker.sendWork<
          _TaskName,
          _ArgsType,
          _ResultType
        >(
          jobId, resolve, reject,
          args, taskName,
        );
      })
    },
    registerWorkerTask(workerSideBroker: BaseWorkerSideBroker) {
      // ...
      // ...
      workerSideBroker.registerTask(taskName, workFunc);
    },
    toTask: workFunc,
  };
}
