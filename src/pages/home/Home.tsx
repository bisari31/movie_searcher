import styles from './home.module.scss'
import { useRecoilValue } from 'recoil'
import { movieData, searchComent } from 'recoil/movie'
import Search from 'components/search/Search'
import MovieList from 'components/common/movieList/MovieList'
import { IMovies } from 'types/movies'
import React from 'react'

const Home = () => {
  const movies: IMovies[] = useRecoilValue(movieData)
  const coments = useRecoilValue(searchComent)

  return (
    <>
      <header>
        <Search />
      </header>
      <main>
        <div className={styles.wrapper}>
          {movies.length === 0
            ? coments
            : movies.map((movie, index) => <MovieList key={`movie-${index}`} movie={movie} />)}
        </div>
      </main>
    </>
  )
}

export default Home
