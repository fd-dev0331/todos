export interface TodoData {
  todo: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }
  isEditMode: boolean;
}
