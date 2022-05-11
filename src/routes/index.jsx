import { Route, Routes } from 'react-router-dom'
import Favorites from './pages/favorites/Favorites'
import Home from './pages/home/Home'
import Layout from './pages/layout/Layout'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App
