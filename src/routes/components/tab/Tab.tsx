import { AiFillStar, AiFillHome } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './tab.module.scss'
import classNames from 'classnames/bind'

const Tab = () => {
  const [isMainPage, setIsMainPage] = useState(true)
  const location = useLocation()
  const cx = classNames.bind(styles)

  useEffect(() => {
    setIsMainPage(location.pathname === '/')
  }, [location, isMainPage])

  return (
    <div className={styles.wrapper}>
      <Link to='/'>
        <AiFillHome className={cx(styles.icon, { active: isMainPage })} />
      </Link>
      <Link to='/favorites'>
        <AiFillStar className={cx(styles.icon, { active: !isMainPage })} />
      </Link>
    </div>
  )
}

export default Tab
