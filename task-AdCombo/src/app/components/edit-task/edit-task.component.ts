import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {TaskManagerService} from '../../core/services/task-manager.service';
import {TaskModel} from '../../core/models/task.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task: TaskModel;

  taskForm: FormGroup;

  taskId: number;

  url: string;

  constructor(private taskManager: TaskManagerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required, Validators.minLength(4),
          Validators.maxLength(25)]),
        description: new FormControl('', [Validators.required, Validators.minLength(4),
          Validators.maxLength(200)]),
        importance: new FormControl('', Validators.required),
        createdDate: new FormControl('', [Validators.required]),
        deadlineDate: new FormControl(''),
        completedDate: new FormControl('')
      });

    this.url = this.route.snapshot.url.join('');
    if (this.url.length > 4 && this.url.slice(0, 4) === 'edit') {
      this.taskId = Number(this.url.slice(4, this.url.length));
      this.task = this.taskManager.getTaskById(this.taskId);
      this.taskForm.get('title').setValue(this.task.title);
      this.taskForm.get('description').setValue(this.task.description);
      this.taskForm.get('importance').setValue(this.task.importance);
      this.taskForm.get('createdDate').setValue(this.task.createdDate);
      this.taskForm.get('deadlineDate').setValue(this.task.deadlineDate);
      this.taskForm.get('completedDate').setValue(this.task.completedDate);
      // this.url = '';
    }

  }

  get title(): FormControl {
    return this.taskForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.taskForm.get('description') as FormControl;
  }

  get importance(): FormControl {
    return this.taskForm.get('importance') as FormControl;
  }

  get createdDate(): FormControl {
    return this.taskForm.get('createdDate') as FormControl;
  }

  get deadlineDate(): FormControl {
    return this.taskForm.get('deadlineDate') as FormControl;
  }

  get completedDate(): FormControl {
    return this.taskForm.get('completedDate') as FormControl;
  }


  submit() {
    if (this.taskForm.valid) {
      this.task = {
        title: this.title.value, description: this.description.value,
        importance: this.importance.value, createdDate: this.createdDate.value, completedDate: this.completedDate.value,
        deadlineDate: this.deadlineDate.value};
      if (this.url.length > 4 && this.url.slice(0, 4) === 'edit') {
        this.taskId = Number(this.url.slice(4, this.url.length));
        this.task.id = this.taskId;
        this.taskManager.changeTask(this.task, this.taskId);
        this.router.navigate(['/']);
        return;
      }
      this.taskManager.setTask(this.task);
      this.router.navigate(['/']);
    }
  }
}

