import { createSlice } from '@reduxjs/toolkit';
import { ISearch } from 'types/movie';

interface IMovies {
  movies: ISearch[];
}

const initialState: IMovies = { movies: [] };

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {
    addMovies(state, action) {
      state.movies = action.payload;
    },
  },
});

export const { addMovies } = movieSlice.actions;

export default movieSlice.reducer;
