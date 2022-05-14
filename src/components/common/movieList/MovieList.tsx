import styles from './movieList.module.scss'
import { currentMovieDateState, modalState, IMovie, movieDataState } from 'recoil/movie'
import cx from 'classnames'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useCallback, useEffect } from 'react'

interface IMovies {
  movie: IMovie
}

const MovieList = ({ movie }: IMovies) => {
  const setShowModal = useSetRecoilState(modalState)
  const [currentMovieData, setCurrentMovieData] = useRecoilState<IMovie>(currentMovieDateState)
  const checkTitleLength = useCallback((text: string) => {
    if (text.length > 65) return text.substring(0, 60).concat('...')
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
