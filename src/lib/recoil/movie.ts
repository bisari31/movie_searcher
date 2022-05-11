import { atom } from 'recoil'

export const movieData = atom({
  key: 'movieData',
  default: [],
})

export const favoriteMovie = atom({
  key: 'favoriteMove',
  default: [],
})

export const searchComent = atom({
  key: 'searchComents',
  default: '검색 결과가 없습니다.',
})
