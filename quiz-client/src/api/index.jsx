/* eslint-disable react-refresh/only-export-components */
import axios from 'axios'

export const BASE_URL = 'http://localhost:5156/'

export const ENDPOINTS = {
  participants: 'participant',
  question: 'question',
  getAnswers: 'question/retrieveanswers',
}
export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + 'api/' + endpoint + '/'

  return {
    fetch: () => axios.get(url),
    post: (newRecord) => axios.post(url, newRecord),
  }
}
