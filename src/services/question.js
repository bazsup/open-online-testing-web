import api from '../api/instance'

export const getAll = () => {
  return api.get('/questions')
}

export const createQuestion = (question) => {
  return api.post('/questions', question)
}
