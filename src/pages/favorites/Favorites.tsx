import MovieList from 'components/common/movieList/MovieList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { favoriteMovieDataState, movieDataState } from 'recoil/movieState'
import styles from './favorites.module.scss'
import { IMovie } from 'types/movieType'
import { useEffect } from 'react'

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieDataState)
  const movies = useRecoilValue(movieDataState)

  useEffect(() => {
    const jsonData = localStorage.getItem('MOVIE_LIST')
    if (jsonData) {
      const data = JSON.parse(jsonData)
      setFavoriteMovies(data)
    } else {
      setFavoriteMovies([])
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
      </main>
    </>
  )
}

export default Favorites
