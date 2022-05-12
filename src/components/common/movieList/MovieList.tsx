import styles from './movieList.module.scss'
import { IMovies } from 'types/movies'
import cx from 'classnames'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useRecoilState } from 'recoil'
import { movieData } from 'recoil/movie'
import { useMemo } from 'react'

interface IMovie {
  movie: IMovies
}

const handleCheckTitle = (text: string) => {
  if (text.length > 65) return text.substring(0, 60).concat('...')
  return text
}

const MovieList = ({ movie }: IMovie) => {
  const [movies, setMovies] = useRecoilState(movieData)

  const handleAddFavorite = (id: string) => {
    setMovies((prev: any) =>
      prev.map((movieItem: any) =>
        movieItem.imdbID === id ? { ...movieItem, Favorite: !movieItem.Favorite } : movieItem
      )
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={movie.Poster} alt={movie.Title} className={cx({ [styles.noImg]: movie.Poster === 'N/A' })} />
        <div className={styles.iconWrapper}>
          {movie.Favorite ? <AiFillStar /> : <AiOutlineStar className={styles.outlineIcon} />}
          <button type='button' onClick={() => handleAddFavorite(movie.imdbID)}>
            {movie.Favorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
          </button>
        </div>
      </div>
      <div className={styles.description}>
        <h2>{handleCheckTitle(movie.Title)}</h2>
        <span>개봉연도: {movie.Year}</span>
        <span>장르: {movie.Type}</span>
      </div>
      {/* {showModal && <Modal />} */}
    </div>
  )
}

export default MovieList
