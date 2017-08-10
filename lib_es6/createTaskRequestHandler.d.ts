import { TaskRequestType, TaskResponseType } from './types';
import { WorkerGroupType } from './createWorkerGroup';
export declare type TaskRequestHandlerType = (taskRequest: TaskRequestType) => Promise<TaskResponseType>;
export default function createTaskRequestHandler(workerGroup: WorkerGroupType): TaskRequestHandlerType;
