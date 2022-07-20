import { combineReducers, configureStore } from '@reduxjs/toolkit';
import movieSlice from './movies';

const rootReducer = combineReducers({
  movies: movieSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
