import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {NgFor, NgIf} from '@angular/common';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todos-list',
  imports: [TodoItemComponent, TodoItemComponent, NgFor, NgIf],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  private readonly todosService = inject(TodoService);
  public todos$ = this.todosService.todos$;
}
