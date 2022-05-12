import React, { useCallback } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { inputText, movieData, searchComent } from 'recoil/movie'
import styles from './search.module.scss'
import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'
import { getMovieApi } from 'services/movieSearch'

const Search = () => {
  const [searchText, setSearchText] = useRecoilState(inputText)
  const [movies, setMovies] = useRecoilState(movieData)
  // const setMovies = useSetRecoilState(movieData)
  const setSearchComent = useSetRecoilState(searchComent)
  const resetState = useResetRecoilState(movieData)
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)

  const checkInputText = (text?: string) => {
    if (text) setSearchComent(`${text}에 대한 검색 결과가 없습니다.`)
    if (!text) setSearchComent(`검색어를 입력해 주세요`)
    return resetState()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchText) checkInputText()
    try {
      const response = await getMovieApi(searchText, 1)
      const data = await response.data
      console.log(data)
      if (data.Response === 'False') throw new Error(data.Error)
      setMovies(data.Search)
    } catch (error) {
      checkInputText(searchText)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form action='' onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Keyword' value={searchText} onChange={handleChangeText} />
        <button type='submit' aria-label='btn'>
          <RiSearchLine />
        </button>
      </form>
    </div>
  )
}

export default Search
