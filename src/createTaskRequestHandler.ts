import {
  TaskRequestType,
  TaskResponseType,
} from './types';
import {
  WorkerGroupType,
} from './createWorkerGroup';
import {
  toIRemoteError,
} from './RemoteError';

export type TaskRequestHandlerType = (
  taskRequest: TaskRequestType
) => Promise<TaskResponseType>;

export default function createTaskRequestHandler(
  workerGroup: WorkerGroupType,
): TaskRequestHandlerType {
  return async (taskRequest) => {
    try {
      const worker = workerGroup[taskRequest.taskName];
      const result = await worker(taskRequest.args);
      return {
        result,
        taskName: taskRequest.taskName,
        jobId: taskRequest.jobId,
        __TaskResponseMessageType: null,
      }
    } catch(originalError) {
      const remoteError = await toIRemoteError(originalError);
      return {
        remoteError,
        taskName: taskRequest.taskName,
        jobId: taskRequest.jobId,
        __TaskResponseMessageType: null,
      };
    }
  }
}
