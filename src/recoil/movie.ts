import { atom } from 'recoil'

export interface IMovie {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
  Favorites: boolean
}

export const movieDataState = atom<IMovie[]>({
  key: 'movieDataState',
  default: [],
})

export const searchComentState = atom({
  key: 'searchComentsState',
  default: '검색 결과가 없습니다.',
})

export const inputTextState = atom({
  key: 'inputTextState',
  default: '',
})

export const favoriteMovieDataState = atom<IMovie[]>({
  key: 'favoriteMoviesState',
  default: [],
})

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const currentMovieDateState = atom({
  key: 'currentMovieDateState',
  default: {
    Poster: 'url',
    Title: 'movieName',
    Type: 'movie',
    Year: 'Year',
    imdbID: 'imdbId',
    Favorites: false,
  },
})

export const loadingState = atom({
  key: 'loadingState',
  default: false,
})
