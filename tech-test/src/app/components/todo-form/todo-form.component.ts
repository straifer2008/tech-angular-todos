import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoI } from '../../modeles/todo.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  isOpen = false;
  form: FormGroup;
  @Output() createTodo: EventEmitter<Partial<TodoI>> = new EventEmitter<Partial<TodoI>>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.validateAllFormFields(this.form);
    if (this.form.valid) {
      this.createTodo.emit(this.form.value);
      this.form.reset();
      this.isOpen = false;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
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
