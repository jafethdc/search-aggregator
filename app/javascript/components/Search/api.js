import axios from 'axios'

export function search(params) {
  return axios.get('/api/search', {params})
}
