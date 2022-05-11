import styles from './movieList.module.scss'
import { IMovies } from 'lib/types/movies'
import cx from 'classnames'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'
import { movieData } from 'lib/recoil/movie'

interface IMovie {
  movie: IMovies
}
const MovieList = ({ movie }: IMovie) => {
  const setMovies = useSetRecoilState(movieData)
  // const handleChangeFavorite = (id: string) => {
  //   return setMovies((prev: []) =>
  //     prev.map((movie) => (movie.imdbId === id ? { ...movie, isFavorite: !movie.isFavorite } : movie))
  //   )
  // }
  return (
    <div className={styles.wrapper}>
      <img src={movie.Poster} alt={movie.Title} className={cx({ [styles.noImg]: movie.Poster === 'N/A' })} />
      <div className={styles.description}>
        <h2>{movie.Title}</h2>
        <span>개봉연도: {movie.Year}</span>
        <span>장르: {movie.Type}</span>
      </div>
      {movie.isFavorite ? <AiFillStar className={styles.icon} /> : <AiOutlineStar className={styles.icon} />}
    </div>
  )
}

export default MovieList
