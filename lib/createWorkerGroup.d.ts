import { TaskDefinitionType, DoWorkType } from './types';
export declare type WorkerGroupType = {
    [key: string]: DoWorkType<string>;
};
export default function createWorkerGroup(...taskDefinitions: TaskDefinitionType<string>[]): WorkerGroupType;
