import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interface/todo.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  imports: [MatCheckboxModule, FormsModule, MatButtonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  private todoService = inject(TodoService);
  readonly status = signal<boolean>(false);
  private dialog = inject(MatDialog);
  private id = signal<number>(0);
  private readonly router = inject(Router);

  ngOnInit() {
    this.status.set(this.todo.completed);
    this.id.set(this.todo.id);
  }

  changeStatus(newValue: boolean) {
    const changedTodo: Todo = {
      ...this.todo,
      completed: newValue,
    };
    this.status.set(newValue);
    this.todoService.editeTodo(changedTodo);
  }

  onItemDelete(item: number) {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      data: this.todo,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== '') {
        this.todoService.deleteTodo(item);
      }
    });
  }

  onOpenDetail(todo: Todo) {
    this.router.navigate(['/task', this.todo.id]);
  }

  onTodoEdite() {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: this.todo,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== '') {
        const editedTodo = {
          ...result,
          id: this.id(),
        };
        this.todoService.editeTodo(editedTodo);
      }
    });
  }
}
