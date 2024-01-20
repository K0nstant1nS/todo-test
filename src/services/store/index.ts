import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "../reducers/todos";
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    todos: todosReducer
  },
  middleware: [thunk],
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
