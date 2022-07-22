import { createSlice } from '@reduxjs/toolkit';
import { ISearch } from 'types/movie';

interface IMovies {
  movies: ISearch[];
  isError: boolean;
  isLoading: boolean;
}

const initialState: IMovies = { movies: [], isError: false, isLoading: false };

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {
    addMovies(state, action) {
      const data = action.payload;
      const newData = data.map((movie: ISearch) => ({
        ...movie,
        favorite: false,
      }));
      state.movies = newData;
    },
    checkError(state, action) {
      state.isError = action.payload;
    },
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
    toggleFavoriteOpion(state, action) {
      state.movies = state.movies.map((movie) =>
        movie.imdbID === action.payload
          ? { ...movie, favorite: !movie.favorite }
          : movie,
      );
    },
  },
});

export const { addMovies, checkError, toggleLoading, toggleFavoriteOpion } =
  movieSlice.actions;

export default movieSlice.reducer;
