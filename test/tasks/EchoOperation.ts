import {
  BaseArgsType,
  BaseResultType,
  createTaskDefinition,
} from '../../src';

import {
  clientStubIntermediary,
} from './base';

export type EchoOperationArgs = {
  toEcho: string,
} & BaseArgsType;

export type EchoOperationResult = {
  echoed: string,
} & BaseResultType;

export const EchoOperationTask = createTaskDefinition<
  'ECHO_OPERATION'
  , EchoOperationArgs
  , EchoOperationResult
> (
  'ECHO_OPERATION',
  clientStubIntermediary,
  (args) => new Promise((resolve, reject) => {
    resolve({
      echoed: args.toEcho,
      __BaseResultType: null,
      __ServerStubResultType: null,
    })
  })
);