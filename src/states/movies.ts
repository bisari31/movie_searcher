import { createSlice } from '@reduxjs/toolkit';
import store from 'store';

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
      const storageData = store.get('movies');
      const data: ISearch[] = action.payload;
      let newData: ISearch[] = data.map((movie) => ({
        ...movie,
        favorite: false,
      }));
      if (!storageData || storageData.length < 1) state.movies = newData;
      else {
        newData = [...storageData, ...newData];
        state.movies = newData.reduce((acc: ISearch[], cur) => {
          if (acc.findIndex((item) => item.imdbID === cur.imdbID) === -1)
            acc.push(cur);
          return acc;
        }, []);
      }
    },
    checkError(state, action) {
      state.isError = action.payload;
    },
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
    toggleFavoriteOption(state, action) {
      const newMovie = {
        ...action.payload,
        favorite: !action.payload.favorite,
      };
      state.movies = state.movies.map((movie) =>
        movie.imdbID === action.payload.imdbID ? newMovie : movie,
      );
      let storageData: ISearch[] = store.get('movies');
      if (!storageData || storageData.length < 1) {
        storageData = [newMovie];
      } else if (!newMovie.favorite) {
        storageData = storageData.filter(
          (movie) => movie.imdbID !== newMovie.imdbID,
        );
      } else {
        storageData.push(newMovie);
      }
      store.set('movies', storageData);
    },
  },
});

export const { addMovies, checkError, toggleLoading, toggleFavoriteOption } =
  movieSlice.actions;

export default movieSlice.reducer;
