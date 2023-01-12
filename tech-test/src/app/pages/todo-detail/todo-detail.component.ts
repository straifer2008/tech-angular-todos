import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TodoI } from '../../modeles/todo.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnDestroy {
  private readonly id: number;
  private ngUnsubscribe = new Subject<void>();
  todo: TodoI;
  form: FormGroup;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      label: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      done: [false],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  private getData() {
    if (!this.id) {
      return;
    }

    this.todoService
      .getTodoDetail(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((todo) => {
        this.todo = todo;
        this.form.setValue({
          ...todo,
          done: !!todo?.done
        });
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.validateAllFormFields(this.form);
    }

    this.todoService
      .makeTodo(this.form.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.router.navigate(['..']));
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
