import styles from './movieList.module.scss'
import { currentMovieDateState, modalState, IMovie } from 'recoil/movie'
import cx from 'classnames'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'
import { useCallback } from 'react'

interface IMovies {
  movie: IMovie
}

const MAX_LENGTH = 55

const MovieList = ({ movie }: IMovies) => {
  const setShowModal = useSetRecoilState(modalState)
  const setCurrentMovieData = useSetRecoilState<IMovie>(currentMovieDateState)

  const checkTitleLength = useCallback((text: string) => {
    if (text.length > MAX_LENGTH) return text.substring(0, MAX_LENGTH).concat('...')
    return text
  }, [])

  const handleChangeFavorite = () => {
    setCurrentMovieData(movie)
    setShowModal((prev) => !prev)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={movie.Poster} alt={movie.Title} className={cx({ [styles.noImg]: movie.Poster === 'N/A' })} />
        <div className={styles.iconWrapper}>
          {movie.Favorites ? <AiFillStar /> : <AiOutlineStar className={styles.outlineIcon} />}
          <button type='button' onClick={handleChangeFavorite}>
            {movie.Favorites ? '즐겨찾기 제거' : '즐겨찾기 추가'}
          </button>
        </div>
      </div>
      <div className={styles.description}>
        <h2>{checkTitleLength(movie.Title)}</h2>
        <span>개봉연도: {movie.Year}</span>
        <span>장르: {movie.Type}</span>
      </div>
    </div>
  )
}

export default MovieList
