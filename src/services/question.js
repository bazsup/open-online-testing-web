import api from '../api/instance'

export const getAll = () => {
  return api.get('/questions')
}