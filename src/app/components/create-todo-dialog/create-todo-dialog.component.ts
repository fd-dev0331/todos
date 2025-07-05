import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  createTodoData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<CreateTodoDialogComponent>);

  public createTodo = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl(null),
    completed: new FormControl(false),
  });
}
