import { useEffect, useRef, useState } from 'react'
import styles from './home.module.scss'
import Search from 'components/searchBar/SearchBar'
import Modal from 'components/common/modal/Modal'
import MovieList from 'components/common/movieList/MovieList'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  movieDataState,
  searchComentState,
  modalState,
  loadingState,
  inputTextState,
  favoriteMovieDataState,
  IMovie,
} from 'recoil/movie'
import { getMovieApi } from 'utils/movieApi'
import ReactLoading from 'react-loading'

const Home = () => {
  const [lastPage, setLasetPage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const movies = useRecoilValue(movieDataState)
  const coments = useRecoilValue(searchComentState)
  const showModal = useRecoilValue(modalState)
  const setFavoriteMovies = useSetRecoilState(favoriteMovieDataState)
  const searchText = useRecoilValue(inputTextState)
  const setMovies = useSetRecoilState(movieDataState)
  const observerRef = useRef<IntersectionObserver>()
  const targetRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef(2)

  const fetch = async () => {
    try {
      setIsLoading(true)
      const response = await getMovieApi(searchText, pageRef.current)
      const data = await response.data
      if (data.Response === 'False') throw new Error(data.Error)
      const newData = data.Search.map((item: IMovie) => {
        return { ...item, Favorites: false }
      })
      setMovies((prev) => [...prev, ...newData])
      pageRef.current += 1
    } catch (error) {
      setLasetPage(true)
    } finally {
      setIsLoading(false)
    }
  }

  const intersectionObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) fetch()
    })
  }

  useEffect(() => {
    if (targetRef.current && movies.length && !isLoading && !lastPage) {
      observerRef.current = new IntersectionObserver(intersectionObserver)
      targetRef.current && observerRef.current.observe(targetRef.current)
    }
    return () => observerRef.current && observerRef.current.disconnect()
  })

  useEffect(() => {
    setLasetPage(false)
    scrollToTop()
  }, [searchText])

  useEffect(() => {
    const data = localStorage.getItem('MOVIE_DATA')
    if (data) {
      const parseData = JSON.parse(data)
      setFavoriteMovies(parseData)
    }
    if (movies.length) {
      const setMovie = movies.filter((movie) => movie.Favorites)
      setFavoriteMovies(setMovie)
      localStorage.setItem('MOVIE_DATA', JSON.stringify(setMovie))
    }
  }, [movies, setFavoriteMovies])

  const scrollToTop = () => {
    scrollRef.current?.scrollIntoView(true)
  }

  return (
    <>
      <header>
        <Search />
      </header>
      <main>
        <div className={styles.wrapper} ref={scrollRef}>
          {movies.length === 0 && !isLoading ? (
            <span className={styles.comment}>{coments}</span>
          ) : (
            movies.map((movie) => <MovieList key={movie.imdbID} movie={movie} />)
          )}

          {isLoading && (
            <ReactLoading className={styles.loading} type='bubbles' color='#7295cd' height='25%' width='25%' />
          )}
          <div className={styles.target} ref={targetRef} />
          {lastPage && <span className={styles.waring}>마지막 영화 입니다.</span>}
        </div>
        {showModal && <Modal />}
      </main>
    </>
  )
}

export default Home
