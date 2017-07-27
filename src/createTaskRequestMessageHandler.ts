import {
  TaskRequestType,
} from './types';
import {
  TaskRequestHandlerType,
} from './createTaskRequestHandler';

// declare var postMessage: (message: any) => any;
export default function createTaskRequestMessageHandler(
  taskRequestHandler: TaskRequestHandlerType
) {
  return async (message: MessageEvent) => {
    const dataStr: string = message.data;
    const taskRequest: TaskRequestType = JSON.parse(dataStr);
    const result = await taskRequestHandler(taskRequest);
    // debugger;
    postMessage(result);
  }
}