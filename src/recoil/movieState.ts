import { atom } from 'recoil'
import { IMovie } from 'types/movieType'

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

export const loadingState = atom({
  key: 'loadingState',
  default: false,
})
