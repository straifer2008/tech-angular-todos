import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoDetailComponent } from './pages/todo-detail/todo-detail.component';


const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: ':id', component: TodoDetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
