import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from './components/list-task/list-task.component';
import {EditTaskComponent} from './components/edit-task/edit-task.component';

const routes: Routes = [
  {path: '', component: ListTaskComponent},
  {path: 'adding', component: EditTaskComponent},
  {path: 'edit/:taskId', component: EditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
