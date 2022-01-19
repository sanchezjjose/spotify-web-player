import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

export function makeStore() {
  return configureStore({
    reducer: rootReducer
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
