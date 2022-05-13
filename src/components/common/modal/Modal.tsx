import { useRecoilState, useRecoilValue } from 'recoil'
import styles from './modal.module.scss'
import { currentMovieDateState, modalState } from 'recoil/movie'
import { useRef, useEffect } from 'react'

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const currentMovieData = useRecoilValue(currentMovieDateState)
  const ref = useRef<HTMLDivElement>(null)
  const handleClickOutSide = (e: any) => {
    if (showModal && !ref.current?.contains(e.target)) {
      setShowModal(false)
    }
  }

  useEffect(() => {
    if (showModal) document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  })
  // console.log(currentMovieData)
  const handleCloseModal = () => setShowModal((prev) => !prev)
  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.content}>
        <span>asd</span>
        <div>
          <button type='button'>즐겨찾기</button>
          <button type='button' onClick={handleCloseModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
