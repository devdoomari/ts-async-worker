export abstract class BaseWorkerSideBroker {
  abstract registerTask(taskName: string, workFunc: any): void;
}
