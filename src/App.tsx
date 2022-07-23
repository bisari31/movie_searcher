import { Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import Favorites from 'pages/Favorites';
import Search from 'pages/Search';
import Layout from 'components/Layout';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="search/:title" element={<Search />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}
