import styles from './home.module.scss'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { movieDataState, searchComentState, modalState, pageNumberState, loadingState } from 'recoil/movie'
import Search from 'components/searchBar/SearchBar'
import MovieList from 'components/common/movieList/MovieList'
import { IMovie } from 'types/movie'
import { useRef, useState } from 'react'
import Modal from 'components/common/modal/Modal'

const Home = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const movies: IMovie[] = useRecoilValue(movieDataState)
  const coments = useRecoilValue(searchComentState)
  const showModal = useRecoilValue(modalState)
  const setPageNumber = useSetRecoilState(pageNumberState)
  const observerRef = useRef(null)
  // const onserver = (node) => {
  //   if (isLoading) return
  //   if (observerRef.current) observerRef.current.disconnect()

  //   observerRef.current = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting && hasMore) {
  //       setPageNumber((prev) => prev + 1)
  //     }
  //   })
  //   node && observerRef.current.observe(node)
  // }
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
            movies.map((movie, index) => <MovieList key={`movieList-${index}`} movie={movie} />)
          )}
          <div ref={observerRef} />
          {isLoading && <span className={styles.loading}>loading......</span>}
        </div>
        {showModal && <Modal />}
      </main>
    </>
  )
}

export default Home
