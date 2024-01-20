import { createAction } from "@reduxjs/toolkit"

export const ADD_TODO = createAction('todos/ADD_TODO');
export const CHANGE_TODO = createAction('todos/CHANGE_TODO');
export const REMOVE_TODO = createAction('todos/REMOVE_TODO');
