import axios from 'axios'

const api = axios.create({
  baseURL: 'http://b37f3139db5b.ngrok.io',
})

export default api
