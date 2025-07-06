import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Todo} from '../../interface/todo';
import {TodoService} from '../../services/todo.service';
import {NgClass, NgIf} from '@angular/common';

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
  todoId!: number;
  public todo!: Todo | undefined;

  constructor() {
    this.route.paramMap.subscribe((params: ParamMap): void => {
      this.todoId = Number(params.get('id'));
    });
    effect((): void => {
      this.todo = this.todos().find((t: Todo): boolean => t.id === this.todoId);
    });
  }

  onRedirectHome(): void {
    this.router.navigate(['']);
  }
}
