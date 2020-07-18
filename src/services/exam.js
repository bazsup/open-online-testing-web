import api from '../api/instance'

export const getAll = () => {
  return api.get('/exams')
}

/**
 * 
 * @param {object} exam 
 */
export const create = (exam) => {
  return api.post('/exam', exam)
}