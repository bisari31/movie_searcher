import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Favorites from './pages/favorites/Favorites'
import Home from './pages/home/Home'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App
