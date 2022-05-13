import MovieList from 'components/common/movieList/MovieList'
import { useRecoilValue } from 'recoil'
import { favoriteMovieDataState } from 'recoil/movie'
import styles from './favorites.module.scss'

const Favorites = () => {
  const favoriteMovies = useRecoilValue(favoriteMovieDataState)
  return (
    <>
      <header className={styles.header}>
        <h1>내 즐겨찾기</h1>
      </header>
      <main>
        {favoriteMovies.map((movie, index) => (
          <MovieList key={`favoriteMovie-${index}`} movie={movie} />
        ))}
      </main>
    </>
  )
}

export default Favorites
