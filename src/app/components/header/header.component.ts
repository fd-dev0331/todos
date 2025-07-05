import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CreateTodoDialogComponent} from '../create-todo-dialog/create-todo-dialog.component';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  dialog = inject(MatDialog);
  todoService = inject(TodoService);

  onCreateTodo(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== '') {
        this.todoService.addTodo(result);
      }
    });
  }
}
