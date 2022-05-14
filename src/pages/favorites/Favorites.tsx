import Modal from 'components/common/modal/Modal'
import MovieList from 'components/common/movieList/MovieList'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { favoriteMovieDataState, IMovie, modalState, movieDataState } from 'recoil/movie'
import styles from './favorites.module.scss'

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieDataState)
  const movies = useRecoilValue(movieDataState)
  const showModal = useRecoilValue(modalState)

  useEffect(() => {
    const data = localStorage.getItem('MOVIE_DATA')
    if (data) {
      const parseData = JSON.parse(data)
      setFavoriteMovies(parseData)
    }
    if (movies.length) {
      const setMovie = movies.filter((movie) => movie.Favorites)
      setFavoriteMovies(setMovie)
      localStorage.setItem('MOVIE_DATA', JSON.stringify(setMovie))
    }
  }, [movies, setFavoriteMovies])

  return (
    <>
      <header className={styles.header}>
        <h1>내 즐겨찾기</h1>
      </header>
      <main>
        {favoriteMovies.length
          ? favoriteMovies.map((movie: IMovie) => <MovieList key={movie.imdbID} movie={movie} />)
          : '즐겨찾기를 추가해 주세요'}
        {showModal && <Modal />}
      </main>
    </>
  )
}

export default Favorites
