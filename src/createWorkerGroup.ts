import {
  reduce,
} from 'lodash';
import {
  TaskDefinitionType,
  DoWorkType,
} from './types';


export type WorkerGroupType = {
  [key: string]: DoWorkType<string>
};

export default function createWorkerGroup(
  ...taskDefinitions: TaskDefinitionType<string>[]
) {
  const workerGroup = reduce<
    TaskDefinitionType<string>
    , WorkerGroupType
  >(
    taskDefinitions,
    (result, taskDefinition, key) => {
      const taskName = taskDefinition.taskName;
      return {
        ...result,
        [taskName]: taskDefinition.doWork
      };
    },
    {}
  )

  type workerGroup = keyof typeof workerGroup;
  return workerGroup;
}
