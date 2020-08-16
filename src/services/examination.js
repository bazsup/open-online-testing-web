import api from '../api/instance'

export const submitExamination = (answers) => {
  return new Promise((resolve, reject) => {
    const mockData = {}
    setTimeout(() => {
      resolve(mockData)
    }, 3000)
  })
  // api.post('/examination', answers)
}
