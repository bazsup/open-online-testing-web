import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://b37f3139db5b.ngrok.io/',
  // baseURL: 'https://api.devopsculture.tk/depa/'
  baseURL: 'http://depa-backend-service/',
})

export default api
