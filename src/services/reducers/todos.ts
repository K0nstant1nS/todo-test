/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TTodo, IAction, TDropSwitchData } from '../../utils/types'
import { createSlice } from '@reduxjs/toolkit'

export type TTodosState = {
  active: TTodo[],
  done: TTodo[],
}

const initialState:TTodosState = {
  active: [],
  done: [],
} 

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addTodo(state, action: IAction<TTodo>) {
      state[action.payload.status] = [...state[action.payload.status], action.payload]
    },
    removeTodo(state, action: IAction<TTodo>) {
      state[action.payload.status] = state[action.payload.status].filter(item => item.id !== action.payload.id)
    },
    changeTodo(state, action: IAction<TTodo>) {
      state[action.payload.status] = state[action.payload.status].map(item => {
        if(item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    },
    switchPosition(state, action: IAction<TDropSwitchData>) {
      // копирование элемента для перезаписи поля status
      const sourceCopy = {...action.payload.source};
      // удаление переносимого элемента из стора
      state[action.payload.source.status] = state[action.payload.source.status].filter(item => item.id !== sourceCopy.id);
      sourceCopy.status = action.payload.targetContainer;
      // добавление удаленного элемента в новую позицию
      state[action.payload.targetContainer] = [...state[action.payload.targetContainer].slice(0, action.payload.destination), sourceCopy,  ...state[action.payload.targetContainer].slice(action.payload.destination)];
    }
  }
})

export const todosReducer = postsSlice.reducer;
export const todosActions = postsSlice.actions;
