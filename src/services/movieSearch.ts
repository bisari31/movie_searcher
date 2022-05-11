import axios from 'axios'

const BASE_URL = 'http://www.omdbapi.com'

export const getMovieApi = (movie: string, page: number) => {
  return axios.get(`${BASE_URL}/?apikey=${process.env.REACT_APP_API_KEY}&s=${movie}&page=${page}`)
}
