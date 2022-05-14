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
import classNames from 'classnames'

const Home = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const movies = useRecoilValue(movieDataState)
  const coments = useRecoilValue(searchComentState)
  const showModal = useRecoilValue(modalState)
  const setFavoriteMovies = useSetRecoilState(favoriteMovieDataState)
  const searchText = useRecoilValue(inputTextState)
  const setMovies = useSetRecoilState(movieDataState)
  const [lastPage, setLasetPage] = useState<boolean>(false)
  const observerRef = useRef<IntersectionObserver>()
  const targetRef = useRef<HTMLDivElement>(null)
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
      setIsLoading(false)
      pageRef.current += 1
      setIsLoading(false)
    } catch (error) {
      setLasetPage(true)
    }
  }

  useEffect(() => {
    if (targetRef.current && movies.length && !isLoading) {
      observerRef.current = new IntersectionObserver(intersectionObserver)
      targetRef.current && observerRef.current.observe(targetRef.current)
    }
    return () => observerRef.current && observerRef.current.disconnect()
  })

  const intersectionObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetch()
      }
    })
  }

  useEffect(() => {
    setLasetPage(false)
  }, [searchText])

  useEffect(() => {
    const data = localStorage.getItem('movie')
    if (data) {
      const parseData = JSON.parse(data)
      setFavoriteMovies(parseData)
    }
    if (movies.length) {
      const setMovie = movies.filter((movie) => movie.Favorites)
      setFavoriteMovies(setMovie)
      localStorage.setItem('movie', JSON.stringify(setMovie))
    }
  }, [movies, setFavoriteMovies])

  return (
    <>
      <header>
        <Search />
      </header>
      <main>
        <div className={styles.wrapper}>
          {movies.length === 0 && !isLoading ? (
            <span className={styles.comment}>{coments}</span>
          ) : (
            movies.map((movie) => <MovieList key={movie.imdbID} movie={movie} />)
          )}
          {isLoading && (
            <ReactLoading className={styles.loading} type='bubbles' color='#7295cd' height='20%' width='20%' />
          )}
          <div className={classNames(styles.target, { [styles.none]: lastPage })} ref={targetRef} />
          {lastPage && <span className={styles.waring}>마지막 영화 입니다.</span>}
        </div>
        {showModal && <Modal />}
      </main>
    </>
  )
}

export default Home
