import axios from 'axios'

const api = axios.create({
  baseURL: 'http://depa-backend-service/'
})

export default api
