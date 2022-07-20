import { createSlice } from '@reduxjs/toolkit';
import { ISearch } from 'types/movie';

interface IMovies {
  movies: ISearch[];
  isError: boolean;
}

const initialState: IMovies = { movies: [], isError: false };

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {
    addMovies(state, action) {
      state.movies = action.payload;
    },
    checkError(state, action) {
      state.isError = action.payload;
    },
  },
});

export const { addMovies, checkError } = movieSlice.actions;

export default movieSlice.reducer;
