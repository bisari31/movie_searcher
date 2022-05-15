import React, { useCallback, useState } from 'react'
import styles from './movieList.module.scss'
import { IMovie } from 'types/movieType'
import cx from 'classnames'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Modal from '../modal/Modal'

interface IMovies {
  movie: IMovie
}

const MAX_LENGTH = 55

const MovieList = ({ movie }: IMovies) => {
  const [modalOn, setModalOn] = useState(false)
  const checkTitleLength = useCallback((text: string) => {
    if (text.length > MAX_LENGTH) return text.substring(0, MAX_LENGTH).concat('...')
    return text
  }, [])

  const handleChangeFavorite = () => {
    setModalOn((prev) => !prev)
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
        <span>개봉: {movie.Year}</span>
        <span>장르: {movie.Type}</span>
      </div>
      {modalOn && <Modal modalOn={modalOn} setModalOn={setModalOn} item={movie} />}
    </div>
  )
}

export default React.memo(MovieList)
