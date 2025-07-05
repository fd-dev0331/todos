import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interface/todo.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {DeleteTodoDialogComponent} from '../delete-todo-dialog/delete-todo-dialog.component';
import {Router} from '@angular/router';
import {ShortTitle} from '../../pipes/short-title.pipe';
import {CreateTodoDialogComponent} from '../create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-todo-item',
  imports: [MatCheckboxModule, FormsModule, MatButtonModule, ShortTitle],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  private todoService = inject(TodoService);
  private dialog = inject(MatDialog);
  private readonly router = inject(Router);
  readonly status = signal<boolean>(false);
  private id = signal<number>(0);

  ngOnInit(): void {
    this.status.set(this.todo.completed);
    this.id.set(this.todo.id);
  }

  changeStatus(newValue: boolean): void {
    const changedTodo: Todo = {
      ...this.todo,
      completed: newValue,
    };
    this.status.set(newValue);
    this.todoService.editeTodo(changedTodo);
  }

  onTodoDelete(): void {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      data: this.todo,
    });
    dialogRef.afterClosed().subscribe((id: number): void => {
      this.todoService.deleteTodo(id);
    });
  }

  onOpenDetail(): void {
    this.router.navigate(['/task', this.todo.id]);
  }

  onTodoEdite(): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      data: {
        todo: this.todo,
        isEditMode: true,
      },
    });
    dialogRef.afterClosed().subscribe((editTodo) => {
      const editedTodo = {
        ...editTodo,
        id: this.id(),
      };
      this.todoService.editeTodo(editedTodo);
    });
  }
}
