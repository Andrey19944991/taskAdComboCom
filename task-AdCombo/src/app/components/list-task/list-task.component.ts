import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TaskManagerService} from '../../core/services/task-manager.service';
import {TaskModel} from '../../core/models/task.model';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  taskArr: TaskModel[] = [];
  taskIdArr: number[] = [];

  constructor(private router: Router,
              private taskManager: TaskManagerService) { }

  ngOnInit(): void {
    this.taskArr = this.taskManager.getTasks();
  }

  getPageTask() {
    this.router.navigate(['/adding']);
  }

  editTask(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteTask(id: number) {
    this.taskArr = this.taskArr.filter(task => task.id !== id);
    this.taskManager.setTaskArr(this.taskArr);
  }

  selectNormalTasks() {
    if (this.taskArr != null) {
      this.taskArr = this.taskManager.getTasks();
      this.taskArr = this.taskArr.filter(task => task.importance === 'Normal');
    }
    this.taskIdArr = [];
  }

  selectImportantTasks() {
    if (this.taskArr != null) {
      this.taskArr = this.taskManager.getTasks();
      this.taskArr = this.taskArr.filter(task => task.importance === 'Important');
    }
    this.taskIdArr = [];
  }

  selectVeryImportantTasks() {
    if (this.taskArr != null) {
      this.taskArr = this.taskManager.getTasks();
      this.taskArr = this.taskArr.filter(task => task.importance === 'Very important');
    }
    this.taskIdArr = [];
  }

  selectAllTasks() {
    this.taskArr = this.taskManager.getTasks();
    this.taskIdArr = [];
  }

  deleteSelectTasks() {
    // tslint:disable-next-line:prefer-for-of
    for (const i of this.taskIdArr) {
      this.taskArr = this.taskArr.filter(task => task.id !== i);
    }
    this.taskManager.setTaskArr(this.taskArr);
    this.taskIdArr = [];
  }

  selectTask(id: number) {
    if (this.taskIdArr.includes(id)) {
      this.taskIdArr.splice(this.taskIdArr.indexOf(id), 1);
    } else {
      this.taskIdArr.push(id);
    }
  }

  completeTask(id: number) {
    for (const task of this.taskArr) {
      if (task.id === id) {
        task.status = 'Completed';
        task.completedDate = new Date();
        this.taskManager.setTaskArr(this.taskArr);
        break;
      }
    }
  }
}
