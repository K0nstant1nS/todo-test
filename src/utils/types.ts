export type TTodoStatus = 'active' | 'done' | 'undone';

export type TTodo = {
  id: string;
  date: string;
  name: string;
  text: string;
  created: Date;
  priority: string;
  status: TTodoStatus;
}

export interface IAction<T> {
  payload: T;
}

export type TMenuOption = {
  label: string;
  handler: () => void;
};
