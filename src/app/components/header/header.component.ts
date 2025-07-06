import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CreateTodoDialogComponent} from '../create-todo-dialog/create-todo-dialog.component';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interface/todo';
import {filter, tap} from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  dialog: MatDialog = inject(MatDialog);
  todoService: TodoService = inject(TodoService);

  onCreateTodo(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      data: {
        todo: {},
        isEditMode: false,
      },
    });
    dialogRef.afterClosed().pipe(
      filter((cretedTodo: Todo) => !!cretedTodo && Object.keys(cretedTodo).length > 0),
      tap(creatingTodo => {
        this.todoService.createTodo(creatingTodo)
      })
    ).subscribe();
  }
}
