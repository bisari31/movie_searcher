import Modal from 'components/common/modal/Modal'
import MovieList from 'components/common/movieList/MovieList'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { favoriteMovieDataState, IMovie, modalState, movieDataState } from 'recoil/movie'
import styles from './favorites.module.scss'

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieDataState)
  const movies = useRecoilValue(movieDataState)
  const showModal = useRecoilValue(modalState)
  // const [returnState, setReturnStatse] = useRecoilState(returnState)
  // useEffect(() => {
  //   const data: any = localStorage.getItem('movie') || []
  //   setFavoriteMovies(JSON.parse(data))
  // }, [setFavoriteMovies])

  // useEffect(() => {
  //   const data = localStorage.getItem('movie')
  //   if (data) {
  //     const parseData = JSON.parse(data)
  //     setFavoriteMovies(parseData)
  //   }
  // }, [movies, setFavoriteMovies])
  useEffect(() => {
    const data = localStorage.getItem('movie')
    if (data) {
      const parseData = JSON.parse(data)
      setFavoriteMovies(parseData)
    }
    if (movies.length) {
      const setMovie = movies.filter((movie) => movie.Favorites)
      setFavoriteMovies(setMovie)
      console.log(setMovie)
      localStorage.setItem('movie', JSON.stringify(setMovie))
    }
  }, [movies, setFavoriteMovies])
  return (
    <>
      <header className={styles.header}>
        <h1>내 즐겨찾기</h1>
      </header>
      <main>
        {favoriteMovies.length
          ? favoriteMovies.map((movie: IMovie) => <MovieList key={movie.imdbID} movie={movie} />)
          : '즐겨찾기를 추가해 주세요'}
        {showModal && <Modal />}
      </main>
    </>
  )
}

export default Favorites
