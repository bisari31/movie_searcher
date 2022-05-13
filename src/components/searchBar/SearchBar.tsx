import React, { useEffect, useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { inputTextState, loadingState, movieDataState, pageNumberState, searchComentState } from 'recoil/movie'
import styles from './searchBar.module.scss'
import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'
import { getMovieApi } from 'utils/movieApi'

const Search = () => {
  const [searchText, setSearchText] = useRecoilState(inputTextState)
  const setMovies = useSetRecoilState(movieDataState)
  const setSearchComent = useSetRecoilState(searchComentState)
  const resetState = useResetRecoilState(movieDataState)
  const setIsLoading = useSetRecoilState(loadingState)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)
  const [page, setPage] = useRecoilState(pageNumberState)
  const checkInputText = (text?: string) => {
    if (text) setSearchComent(`${text}에 대한 검색 결과가 없습니다.`)
    if (!text) setSearchComent(`검색어를 입력해 주세요`)
    resetState()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchText) checkInputText()
    try {
      setIsLoading(true)
      const response = await getMovieApi(searchText, page)
      const data = await response.data
      console.log(data)
      if (data.Response === 'False') throw new Error(data.Error)
      setMovies(data.Search)
    } catch (error) {
      checkInputText(searchText)
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
        <input ref={inputRef} type='text' placeholder='Search Keyword' value={searchText} onChange={handleChangeText} />
        <button type='submit' aria-label='btn'>
          <RiSearchLine />
        </button>
      </form>
    </div>
  )
}

export default Search
