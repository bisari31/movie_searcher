import { useState, useEffect } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { movieData } from 'states/movie'
import styles from './search.module.scss'
import { useRecoilState } from 'recoil'
import { getMovieApi } from 'services/movieSearch'

const Search = () => {
  const [inputText, setInputText] = useState('')
  const [movies, setMovies] = useRecoilState(movieData)

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputText) return

    getMovieApi(inputText, 1)
      .then(({ data }) => {
        console.log(data)
        // setMovies(data.Search)
      })
      .catch((error) => {
        console.log(error)
        setMovies([])
      })
  }

  useEffect(() => {
    console.log(movies)
  }, [movies])

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
