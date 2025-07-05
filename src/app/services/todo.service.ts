import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {Todo} from '../interface/todo.interface';
import * as localForage from 'localforage';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public readonly todos = signal<Todo[]>([]);
  readonly todos$ = computed(() => this.todos());
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    if (this.isBrowser) {
      this.loadTodos();
    }
  }

  private async saveTodos(): Promise<void> {
    if (!this.isBrowser) return;
    await localForage.setItem('todos', this.todos());
  }

  async loadTodos(): Promise<void> {
    if (!this.isBrowser) return;
    const data = await localForage.getItem<Todo[]>('todos');

    if (data) {
      this.todos.set(data);
    }
  }

  async createTodo(todo: Todo): Promise<void> {
    if (todo) {
      const newTodo: Todo = {
        id: Date.now(),
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      };
      this.todos.update((current) => [...current, newTodo]);
      await this.saveTodos();
    }
  }

  async editeTodo(editedTodo: Todo): Promise<void> {
    if (editedTodo) {
      this.todos.update((todos) =>
        todos.map((todo) =>
          todo.id === editedTodo.id ? {...todo, ...editedTodo} : todo
        )
      );
      await this.saveTodos();
    }
  }

  async deleteTodo(id: number) {
    if (id) {
      this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
      await this.saveTodos();
    }
  }
}
