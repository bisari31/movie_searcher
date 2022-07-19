import axios from 'axios';
import { IData } from 'types/movies';

const BASE_URL = 'http://www.omdbapi.com';

export const getFetchData = (params: string) =>
  axios.get<IData>(`${BASE_URL}`, {
    params: {
      apiKey: process.env.REACT_APP_API_KEY,
      s: params,
      page: 2,
    },
  });
