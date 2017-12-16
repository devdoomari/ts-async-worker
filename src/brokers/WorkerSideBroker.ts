import {
  BaseWorkerSideBroker,
} from './BaseWorkerSideBroker';
// import { Worker } from 'cluster';

export class WorkerSideBroker extends BaseWorkerSideBroker {

  constructor() {
    super();
    addEventListener('message', this.handlerFunc);
  }
  handlerFunc = (message: MessageEvent) => {

  }
  registerTask(taskName: string, workFunc: any ){
  }
  cleanUp() {
    removeEventListener('message', this.handlerFunc);
  }
}
