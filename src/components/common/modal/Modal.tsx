import styles from './modal.module.scss'
import { IMovie } from 'types/movieType'
import { useRef, useEffect, useCallback } from 'react'
import { movieDataState } from '../../../recoil/movieState'
import { useSetRecoilState } from 'recoil'

interface IProps {
  item: IMovie
  modalOn: boolean
  setModalOn: (bodalOn: boolean) => void
}

const Modal = ({ modalOn, item, setModalOn }: IProps) => {
  const setMovies = useSetRecoilState(movieDataState)
  const ref = useRef<HTMLDivElement>(null)

  const handleCloseModal = useCallback(() => {
    setModalOn(false)
  }, [setModalOn])

  const handleClickOutSide = (e: { target: Node | null | any }) => {
    if (modalOn && !ref.current?.contains(e.target)) {
      setModalOn(false)
    }
  }

  const handleChangeOption = useCallback(() => {
    const newItem = { ...item, Favorites: !item.Favorites }
    handleCloseModal()
    setMovies((prev) =>
      prev.map((movieItem) =>
        movieItem.imdbID === item.imdbID ? { ...movieItem, Favorites: !movieItem.Favorites } : movieItem
      )
    )
    const jsonData = localStorage.getItem('MOVIE_LIST')
    if (jsonData) {
      const data = JSON.parse(jsonData)
      const overlap = data.filter((movie: IMovie) => movie.imdbID !== item.imdbID)

      if (data.length === overlap.length) {
        localStorage.setItem('MOVIE_LIST', JSON.stringify([...overlap, newItem]))
      } else {
        localStorage.setItem('MOVIE_LIST', JSON.stringify([...overlap]))
      }
    } else {
      localStorage.setItem('MOVIE_LIST', JSON.stringify([newItem]))
    }
  }, [handleCloseModal, item, setMovies])

  useEffect(() => {
    if (modalOn) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })

  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.content}>
        <span>{item.Title}</span>
        <div>
          <button type='button' onClick={handleChangeOption}>
            {!item.Favorites ? '즐겨찾기' : '즐겨찾기 제거'}
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
