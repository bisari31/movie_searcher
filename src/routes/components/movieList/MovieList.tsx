import styles from './movieList.module.scss'
import { IMovies } from 'types/movies'
import { favoriteMovie } from '../../../states/movie'
import { useRecoilState } from 'recoil'

interface IMovie {
  movie: IMovies
}
const MovieList = ({ movie }: IMovie) => {
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovie)

  return (
    <div className={styles.wrapper}>
      <img src={movie.Poster} alt={movie.Title} />
      <div className={styles.description}>
        <h2>{movie.Title}</h2>
        <span>개봉년도: {movie.Year}</span>
        <span>장르: {movie.Type}</span>
      </div>
    </div>
  )
}

export default MovieList
