import styles from './modal.module.scss'

const Modal = () => {
  return (
    <div className={styles.wrapper}>
      <button type='button'>즐겨찾기</button>
      <button type='button'>취소</button>
    </div>
  )
}

export default Modal
