import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoSlice from './todos';

const rootReducer = combineReducers({
  todos: todoSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
