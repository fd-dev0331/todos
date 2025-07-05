import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Todo } from '../interface/todo.interface';
import * as localForage from 'localforage';
import { isPlatformBrowser } from '@angular/common';

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

  async addTodo(todo: Todo): Promise<void> {
    const newTodo: Todo = {
      id: Date.now(),
      title: todo.title,
      diskription: todo.diskription,
      completed: todo.completed,
    };
    this.todos.update((current) => [...current, newTodo]);
    await this.saveTodos();
  }

  async editeTodo(newTodo: Todo): Promise<void> {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
      )
    );
    await this.saveTodos();
  }

  async deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    await this.saveTodos();
  }
}
