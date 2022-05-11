import { useState, useEffect } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { movieData, searchComent } from 'lib/recoil/movie'
import styles from './search.module.scss'
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { getMovieApi } from 'lib/services/movieSearch'

const Search = () => {
  const [inputText, setInputText] = useState('')
  const setMovies = useSetRecoilState(movieData)
  const setSearchComent = useSetRecoilState(searchComent)
  const resetState = useResetRecoilState(movieData)
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)

  const checkInputText = (text?: string) => {
    if (text) {
      setSearchComent(`${text}에 대한 검색 결과가 없습니다.`)
    } else setSearchComent(`검색어를 입력해 주세요`)
    resetState()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputText) checkInputText()
    try {
      const response = await getMovieApi(inputText, 1)
      const data = await response.data
      console.log(data)
      if (data.Response === 'False') throw new Error(data.Error)
      setMovies(data.Search)
    } catch (error) {
      checkInputText(inputText)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form action='' onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Keyword' value={inputText} onChange={handleChangeText} />
        <button type='submit' aria-label='btn'>
          <RiSearchLine />
        </button>
      </form>
    </div>
  )
}

export default Search
