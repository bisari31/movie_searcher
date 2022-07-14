import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import {
  favoriteMovieDataState,
  inputTextState,
  loadingState,
  movieDataState,
  searchComentState,
} from 'recoil/movieState'
import styles from './searchBar.module.scss'
import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'
import { getMovieApi } from 'utils/movieApi'
import { IMovie } from 'types/movieType'

const Search = () => {
  const [input, setInput] = useState('')
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieDataState)
  const setSearchText = useSetRecoilState(inputTextState)
  const setMovies = useSetRecoilState(movieDataState)
  const setSearchComent = useSetRecoilState(searchComentState)
  const resetMovie = useResetRecoilState(movieDataState)
  const setIsLoading = useSetRecoilState(loadingState)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)

  const checkInputText = useCallback(
    (text?: string) => {
      if (text) setSearchComent(`${text}에 대한 검색 결과가 없습니다.`)
      if (!text) setSearchComent(`검색어를 입력해 주세요`)
      resetMovie()
    },
    [resetMovie, setSearchComent]
  )

  const getApi = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input) checkInputText()
      try {
        localStorage.removeItem('key')
        setSearchText(input)
        setIsLoading(true)
        const response = await getMovieApi(input, 1)
        const data = await response.data
        if (data.Response === 'False') throw new Error(data.Error)
        const newData = data.Search.map((item: IMovie) => {
          return { ...item, Favorites: false }
        })

        const resultArray = () => {
          const lastArr: IMovie[] = []
          for (let i = 0; i < newData.length; i += 1) {
            for (let j = 0; j < favoriteMovies.length; j += 1) {
              if (newData[i].imdbID === favoriteMovies[j].imdbID) {
                lastArr.push(favoriteMovies[j])
                i += 1
              }
            }
            lastArr.push(newData[i])
          }
          return lastArr
        }
        const arr = resultArray()
        setMovies(arr)
      } catch (error) {
        checkInputText(input)
      } finally {
        setIsLoading(false)
      }
    },
    [checkInputText, favoriteMovies, input, setIsLoading, setMovies, setSearchText]
  )

  useEffect(() => {
    const jsonData = localStorage.getItem('MOVIE_LIST')
    if (jsonData) {
      const fmData = JSON.parse(jsonData)
      setFavoriteMovies(fmData)
    }
    inputRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.wrapper}>
      <form action='' onSubmit={getApi}>
        <input ref={inputRef} type='text' placeholder='Search Keyword' value={input} onChange={handleChangeText} />
        <button type='submit' aria-label='btn'>
          <RiSearchLine />
        </button>
      </form>
    </div>
  )
}

export default Search
