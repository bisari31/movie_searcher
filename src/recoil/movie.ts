import { atom } from 'recoil'
// import { localStorageEffect } from 'utils/localStorage'

export const movieDataState = atom({
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

export const favoriteMovieDataState = atom({
  key: 'favoriteMoviesState',
  default: [],
})

export const pageNumberState = atom({
  key: 'pageNumber',
  default: 1,
})

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const currentMovieDateState = atom({
  key: 'currentMovieDateState',
  default: null,
})

export const loadingState = atom({
  key: 'loadingState',
  default: false,
})

// export const favoriteMovieList = atom({
//   key: 'favoriteMovieList',
//   default: [],
//   effects: [localStorageEffect('favoriteMovieList')],
// })
