import { Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import Favorites from 'pages/Favorites';
import Search from 'pages/Search';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="search/:title" element={<Search />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  );
}
