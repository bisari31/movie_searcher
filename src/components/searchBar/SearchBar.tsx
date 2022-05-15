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
import { useSetRecoilState, useResetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { getMovieApi } from 'utils/movieApi'
import { IMovie } from 'types/movieType'
import Favorites from 'pages/favorites/Favorites'

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

        // const result = newData.map((item:IMovie) => {
        //   favoriteMovies.forEach((fmITem:IMovie) => {
        //     if (item.imdbID === fmITem.imdbID) return (fmITem) 
        //   })
        //   return item
        // })

        // const result = favoriteMovies.filter((item: IMovie) => {
        //   let flag = false
        //   newData.forEach((fmItem: IMovie) => {
        //     if (item.imdbID === fmItem.imdbID) flag = true
        //   })
        //   return flag
        // })
        setMovies(newData)
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
