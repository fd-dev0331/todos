import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal, WritableSignal,
} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interface/todo';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {DeleteTodoDialogComponent} from '../delete-todo-dialog/delete-todo-dialog.component';
import {Router} from '@angular/router';
import {ShortTitle} from '../../pipes/short-title.pipe';
import {CreateTodoDialogComponent} from '../create-todo-dialog/create-todo-dialog.component';
import {filter, tap} from 'rxjs';
import {EditedTodo} from '../../interface/editedTodo';

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
  private id: WritableSignal<number> = signal<number>(0);

  ngOnInit(): void {
    this.status.set(this.todo.completed);
    this.id.set(this.todo.id);
  }

  changeStatus(newStatus: boolean): void {
    const changedTodo: Todo = {
      ...this.todo,
      completed: newStatus,
    };
    this.status.set(newStatus);
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
    dialogRef.afterClosed().pipe(
      filter((editedTodo: EditedTodo) => !!editedTodo && Object.keys(editedTodo).length > 0),
      tap(editingTodo => {
        const updated: Todo = {...editingTodo, id: this.todo.id};
        this.todoService.editeTodo(updated);
      })
    ).subscribe();
  }
}

