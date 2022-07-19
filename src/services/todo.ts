import axios from 'axios';

const BASE_URL = '';

export const getFetchData = () =>
  axios.get(`${BASE_URL}`, {
    params: {},
  });
