// pseudo-code below
import {
  workerGroup,
} from './tasks';

import {
  createTaskRequestHandler,
  createTaskRequestMessageHandler,
} from '../src';

const taskRequestHandler = createTaskRequestHandler(workerGroup);
const taskRequestMessageHandler = createTaskRequestMessageHandler(
  taskRequestHandler
);
addEventListener('message', taskRequestMessageHandler);

// removeEventListener('message', taskRequestMessageHandler);