import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoI } from '../../modeles/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: TodoI;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<{id: number, done: boolean}> = new EventEmitter<{id: number, done: boolean}>();

  constructor() {
  }

  deleteTodo(id: number) {
    this.delete.emit(id);
  }

  updateStatus() {
    this.update.emit({
      done: !this.todo?.done,
      id: this.todo.id
    });
  }
}
