import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Todo} from '../../interface/todo';
import {TodoData} from '../../interface/todoData';

@Component({
  selector: 'app-create-todo-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatLabel,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoDialogComponent {
  public readonly todoData: TodoData = inject(MAT_DIALOG_DATA);
  public isEditMode: WritableSignal<boolean> = signal<boolean>(false);
  private readonly todo: Todo = this.todoData.todo;

  constructor() {
    this.isEditMode.update((mode: boolean): boolean => mode = this.todoData.isEditMode);
  }

  public createTodo: FormGroup = new FormGroup({
    title: new FormControl(this.todo.title, [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl(this.todo.description),
    completed: new FormControl(this.todo.completed),
  });
}
