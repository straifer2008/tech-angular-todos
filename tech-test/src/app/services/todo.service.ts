import { Injectable } from '@angular/core';
import { TodoI } from '../modeles/todo.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
}) // in this case i'm using saving inside service, but we can save in some state manager. Or do requests every time when we need the data
export class TodoService {
  public todos: TodoI[] = [];
  constructor(private api: ApiService) { }

  getTodos(): Observable<TodoI[]> {
    if (this.todos.length) {
      return of(this.todos);
    }

    return this.api.get<TodoI[]>('tasks').pipe(tap((res) => this.todos = res));
  }

  getTodoDetail(id: number): Observable<TodoI> {
    if (this.todos?.length) {
      const current = this.todos.find((todo) => todo.id === id);

      if (current) {
        return of(current);
      }
    }

    return this.api.get<TodoI>(`tasks/${id}`);
  }

  makeTodo(todo: Partial<TodoI>): Observable<TodoI> {
    if (todo?.id) {
      return this.api.patch<TodoI>(`tasks/${todo.id}`, todo).pipe(tap((updated) => {
        this.todos = this.todos.map((item) => {
          if (updated.id === item.id) {
            return updated;
          }

          return item;
        });
      }));
    }

    return this.api.post<TodoI>('tasks', todo).pipe(tap((created) => this.todos.push(created)));
  }

  deleteTodo(id: number): Observable<{ id: number }> {
    // Add map because have no response from server
    return this.api.delete<TodoI>(`tasks/${id}`).pipe(map(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      return { id };
    }));
  }
}
