import styles from './layout.module.scss'
import Tab from 'components/tabBar/TabBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <footer>
        <Tab />
      </footer>
    </div>
  )
}

export default Layout
