import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../interface/todo.interface';
import { TodoService } from '../../services/todo.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf, NgClass],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  public readonly todos = computed(() => this.todoService.todos$());
  taskId!: number;
  public task!: Todo | undefined;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.taskId = Number(params.get('id'));
      const getTask = this.todos().find((t) => t.id === this.taskId);
    });
    effect(() => {
      this.task = this.todos().find((t) => t.id === this.taskId);
    });
  }

  onRedirectHome() {
    this.router.navigate(['']);
  }
}
