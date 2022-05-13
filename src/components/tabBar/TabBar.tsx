import { AiFillStar, AiFillHome } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './tabBar.module.scss'
import cx from 'classnames'

const Tab = () => {
  const [isMainPage, setIsMainPage] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setIsMainPage(location.pathname === '/')
  }, [location, isMainPage])

  return (
    <div className={styles.wrapper}>
      <Link to='/'>
        <AiFillHome className={cx(styles.icon, { [styles.active]: isMainPage })} />
      </Link>
      <Link to='/favorites'>
        <AiFillStar className={cx(styles.icon, { [styles.active]: !isMainPage })} />
      </Link>
    </div>
  )
}

export default Tab
