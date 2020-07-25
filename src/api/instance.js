import axios from 'axios'

const api = axios.create({
  baseURL: 'depa-backend-service/'
})

export default api
