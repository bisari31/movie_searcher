import styles from './movieList.module.scss'
import { IMovie } from 'types/movie'
import cx from 'classnames'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'
import { currentMovieDateState, modalState } from 'recoil/movie'
import { useCallback, useEffect } from 'react'

interface IMovies {
  movie: IMovie
}

const MovieList = ({ movie }: IMovies) => {
  const setShowModal = useSetRecoilState(modalState)
  const setCurrentMovieData = useSetRecoilState(currentMovieDateState)
  const checkTitleLength = useCallback((text: string) => {
    if (text.length > 65) return text.substring(0, 60).concat('...')
    return text
  }, [])

  const handleChangeFavorite = () => {
    setShowModal((prev) => !prev)
    setCurrentMovieData(movie)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={movie.Poster} alt={movie.Title} className={cx({ [styles.noImg]: movie.Poster === 'N/A' })} />
        <div className={styles.iconWrapper}>
          {movie.Favorite ? <AiFillStar /> : <AiOutlineStar className={styles.outlineIcon} />}
          <button type='button' onClick={handleChangeFavorite}>
            {movie.Favorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
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
