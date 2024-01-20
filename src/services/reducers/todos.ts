import { TTodo, IAction } from '../../utils/types'
import { createSlice } from '@reduxjs/toolkit'

export type TTodosState = {
  data: TTodo[],
}

const initialState:TTodosState = {
  data: [],
} 

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addTodo(state, action: IAction<TTodo>) {
      state.data = [...state.data, action.payload]
    },
    removeTodo(state, action: IAction<string>) {
      state.data = state.data.filter(item => item.id !== action.payload)
    },
    changeTodo(state, action: IAction<TTodo>) {
      state.data = state.data.map(item => {
        if(item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    }
  }
})

export const todosReducer = postsSlice.reducer;
export const todosActions = postsSlice.actions;
