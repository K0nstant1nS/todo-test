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
      if(typeof action.payload.destination !== "number"){
        return state
      }
      const sourceBuff = {...state[action.payload.sourceContainer][action.payload.source]}
      console.log(sourceBuff, action.payload);
      state[action.payload.sourceContainer] = [...state[action.payload.sourceContainer].slice(0, action.payload.source),  ...state[action.payload.sourceContainer].slice(action.payload.source + 1)];
      state[action.payload.targetContainer] = [...state[action.payload.sourceContainer].slice(0, action.payload.destination), sourceBuff,  ...state[action.payload.sourceContainer].slice(action.payload.destination)];
    }
  }
})

export const todosReducer = postsSlice.reducer;
export const todosActions = postsSlice.actions;
