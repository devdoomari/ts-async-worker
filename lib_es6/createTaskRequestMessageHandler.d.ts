import { TaskRequestHandlerType } from './createTaskRequestHandler';
export default function createTaskRequestMessageHandler(taskRequestHandler: TaskRequestHandlerType): (message: MessageEvent) => Promise<void>;
