import styles from './home.module.scss'
import { useRecoilValue } from 'recoil'
import { movieData } from 'states/movie'
import Search from 'routes/components/search/Search'
import MovieList from 'routes/components/movieList/MovieList'

const Home = () => {
  const movies = useRecoilValue(movieData)

  return (
    <>
      <header>
        <Search />
      </header>
      <main>
        <div className={styles.wrapper}>
          {movies.length === 0
            ? '검색 결과가 없습니다.'
            : movies.map((movie, index) => <MovieList key={`movie${index}`} movie={movie} />)}
        </div>
      </main>
    </>
  )
}

export default Home
