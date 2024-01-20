import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook  } from "react-redux";
import {ThunkDispatch} from 'redux-thunk'
import { AnyAction } from "redux";
import { RootState } from "./store";


export type TThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = ()=> dispatchHook<TThunkDispatch>()
