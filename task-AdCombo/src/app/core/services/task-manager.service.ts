import {Injectable} from '@angular/core';
import {TaskModel} from '../models/task.model';

@Injectable({providedIn: 'root'})
export class TaskManagerService {

  keyOfData = 'data';

  taskArr: TaskModel[] = [];
  index = 0;

  constructor() {
  }

  setTask(data: TaskModel) {
    if (localStorage.getItem('index') != null) {
      this.index = Number(localStorage.getItem('index')) + 1;
    }
    if (this.taskArr.length !== 0) {
      this.taskArr = this.getTasks();
    }
    localStorage.setItem('index', String(this.index));
    data.id = this.index;
    data.status = 'In work';
    this.taskArr.push(data);
    localStorage.setItem(this.keyOfData, JSON.stringify(this.taskArr));
  }

  getTasks() {
      return JSON.parse(localStorage.getItem(this.keyOfData));
  }

  setTaskArr(data: TaskModel[]) {
    localStorage.setItem(this.keyOfData, JSON.stringify(data));
  }

  getTaskById(id: number) {
    this.taskArr = this.getTasks();
    for (const task of this.taskArr) {
      if (task.id === id) {
        return task;
      }
    }
  }

  changeTask(task: TaskModel, taskId: number) {
    this.taskArr = this.getTasks();
    for (let i = 0; i < this.taskArr.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.taskArr[i].id == taskId ) {
        this.taskArr[i] = task;
        break;
      }
    }
    this.setTaskArr(this.taskArr);
  }
}
