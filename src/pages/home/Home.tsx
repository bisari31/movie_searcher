import styles from './home.module.scss'
import { useRecoilValue } from 'recoil'
import { movieData, searchComent } from 'lib/recoil/movie'
import Search from 'components/search/Search'
import MovieList from 'components/movieList/MovieList'

const Home = () => {
  const movies = useRecoilValue(movieData)
  const coments = useRecoilValue(searchComent)
  console.log(movies)
  return (
    <>
      <header>
        <Search />
      </header>
      <main>
        <div className={styles.wrapper}>
          {movies.length === 0
            ? coments
            : movies.map((movie, index) => <MovieList key={`movie${index}`} movie={movie} />)}
        </div>
      </main>
    </>
  )
}

export default Home
