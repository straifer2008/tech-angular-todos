import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoI } from '../../modeles/todo.interface';
import { Subject } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  todos?: TodoI[];
  private ngUnsubscribe = new Subject<void>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getData() {
    this.todoService
      .getTodos()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => this.todos = res);
  }

  createTodo(todo: Partial<TodoI>) {
    this.todoService
      .makeTodo(todo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.getData());
  }

  deleteTodo(id: number) {
    this.todoService
      .deleteTodo(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.todos = this.todos.filter((todo) => todo?.id !== id));
  }

  updateTodo({id, done}: {id: number; done: boolean}) {
    this.todoService
      .makeTodo({ id, done })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }
}
