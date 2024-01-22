import { iconMappingObject } from "./constants";

export type TTodoStatus = 'active' | 'done';

export type TTodo = {
  id: string;
  name: string;
  text: string;
  created: Date;
  priority: string;
  status: TTodoStatus;
};

export type TDropSwitchData = {
  source: TTodo;
  destination: number;
  targetContainer: TTodoStatus;
};

export interface IAction<T> {
  payload: T;
}

export type TMenuOption = {
  label: string;
  handler: () => void;
  icon?: keyof typeof iconMappingObject;
};

export type TSortSetting = {
  field: string;
  direction: '+' | '-';
}
