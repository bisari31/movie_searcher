import React, { useEffect, useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { inputTextState, loadingState, movieDataState, searchComentState } from 'recoil/movieState'
import styles from './searchBar.module.scss'
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { getMovieApi } from 'utils/movieApi'
import { IMovie } from 'types/movieType'

const Search = () => {
  const setSearchText = useSetRecoilState(inputTextState)
  const setMovies = useSetRecoilState(movieDataState)
  const setSearchComent = useSetRecoilState(searchComentState)
  const resetState = useResetRecoilState(movieDataState)
  const setIsLoading = useSetRecoilState(loadingState)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)

  const checkInputText = (text?: string) => {
    if (text) setSearchComent(`${text}에 대한 검색 결과가 없습니다.`)
    if (!text) setSearchComent(`검색어를 입력해 주세요`)
    resetState()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input) checkInputText()
    try {
      setSearchText(input)
      setIsLoading(true)
      const response = await getMovieApi(input, 1)
      const data = await response.data
      if (data.Response === 'False') throw new Error(data.Error)
      const newData = data.Search.map((item: IMovie) => {
        return { ...item, Favorites: false }
      })
      setMovies(newData)
    } catch (error) {
      checkInputText(input)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={styles.wrapper}>
      <form action='' onSubmit={handleSubmit}>
        <input ref={inputRef} type='text' placeholder='Search Keyword' value={input} onChange={handleChangeText} />
        <button type='submit' aria-label='btn'>
          <RiSearchLine />
        </button>
      </form>
    </div>
  )
}

export default Search
