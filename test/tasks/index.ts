import {
  createWorkerGroup,
} from '../../src';

import {
  EchoOperationTask,
} from './EchoOperation';
import {
  clientStubIntermediary,
} from './base';

export const workerGroup = createWorkerGroup(
  EchoOperationTask,
);
export type workerGroup = keyof typeof workerGroup;

export const echo = EchoOperationTask.sendWork;

export {
  clientStubIntermediary,
};