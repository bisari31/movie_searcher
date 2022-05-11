import { atom } from 'recoil'

export const movieData = atom({
  key: 'movieData',
  default: [],
})

export const favoriteMovie = atom({
  key: 'favoriteMove',
  default: [],
})
