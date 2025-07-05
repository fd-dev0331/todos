import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Todo } from '../../interface/todo.interface';

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatLabel,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogClose,
  ],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTodoDialogComponent {
  private readonly createTodoData = inject<Todo>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<EditTodoDialogComponent>);

  public editeTodo = new FormGroup({
    title: new FormControl(this.createTodoData.title, [
      Validators.required,
      Validators.minLength(5),
    ]),
    diskription: new FormControl(this.createTodoData.diskription),
    completed: new FormControl(this.createTodoData.completed),
  });
}
