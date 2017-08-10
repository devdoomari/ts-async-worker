import { BaseArgsType, BaseResultType, TaskDefinitionType, __ServerStubResultType } from './types';
import ClientStubIntermediary from './ClientStubIntermediary';
export default function createTaskDefinition<_TaskName extends string, _ArgsType extends BaseArgsType, _ResultType extends BaseResultType>(taskName: _TaskName, clientStubintermediary: ClientStubIntermediary, workFunc: (args: _ArgsType) => Promise<_ResultType & __ServerStubResultType>): TaskDefinitionType<_TaskName, _ArgsType, _ResultType>;
