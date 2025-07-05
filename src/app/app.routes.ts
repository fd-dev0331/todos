import { Routes } from '@angular/router';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';

export const routes: Routes = [
  {
    path: '',
    component: TodosListComponent,
  },
  {
    path: 'task/:id',
    component: TodoCardComponent,
  },
];
