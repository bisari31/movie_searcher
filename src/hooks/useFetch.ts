import { useState } from 'react'
import { getMovieApi } from 'utils/movieApi'

const useFetch = async (text: string, page: number) => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  // if (!searchText) checkInputText()
  try {
    const response = await getMovieApi(text, page)
    const fetchData = await response.data
    console.log(fetchData)
    if (fetchData.Response === 'False') throw new Error(fetchData.Error)
    setData(fetchData.Search)
  } catch (fetchError) {
    setError(text)
  }
  return [data, error]
}

export default useFetch
