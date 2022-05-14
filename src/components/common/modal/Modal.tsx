import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styles from './modal.module.scss'
import { currentMovieDateState, modalState, movieDataState, IMovie, favoriteMovieDataState } from 'recoil/movie'
import { useRef, useEffect } from 'react'

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const currentMovieData = useRecoilValue<IMovie>(currentMovieDateState)
  const setMovieData = useSetRecoilState(movieDataState)
  const setFavoriteData = useSetRecoilState(favoriteMovieDataState)
  const ref = useRef<HTMLDivElement>(null)
  const handleCloseModal = () => {
    setShowModal((prev) => !prev)
    return false
  }

  const handleClickOutSide = (e: { target: Node | null | any }) => {
    if (showModal && !ref.current?.contains(e.target)) {
      setShowModal(false)
    }
  }

  const handleChangeOption = () => {
    setMovieData((prev) =>
      prev.map((movie) =>
        movie.imdbID === currentMovieData.imdbID ? { ...currentMovieData, Favorites: !movie.Favorites } : movie
      )
    )
    handleCloseModal()
    setFavoriteData((prev) => prev.filter((movie) => movie.imdbID !== currentMovieData.imdbID))
  }

  useEffect(() => {
    if (showModal) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })

  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.content}>
        <span>{currentMovieData.Title}</span>
        <div>
          <button type='button' onClick={handleChangeOption}>
            {!currentMovieData.Favorites ? '즐겨찾기' : '즐겨찾기 제거'}
          </button>
          <button type='button' onClick={handleCloseModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
