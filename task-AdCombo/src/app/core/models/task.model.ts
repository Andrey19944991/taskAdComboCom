export interface TaskModel {
  title: string;
  description: string;
  importance: string;
  createdDate: Date;
  deadlineDate?: Date;
  completedDate?: Date;
  id?: number;
  status?: string;
}
