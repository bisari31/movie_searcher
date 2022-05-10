import styles from './Layout.module.scss'
import { Outlet } from 'react-router-dom'
import Tab from '../tab/Tab'

const Layout = () => {
  return (
    <div className={styles.wrapper} >
      <main>
        <Outlet/>
      </main>
      <footer>
        <Tab/>
      </footer>
    </div>
  )
}

export default Layout