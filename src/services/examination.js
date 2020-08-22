import api from '../api/instance'

export const submitExamination = (examId, answers) => {
  return api.post(`/exam/${examId}/answer/submit`, answers)
}


export const getExamQuestion = (examId) =>  {
  return api.get(`/exam/${examId}/questions`)
}

export const getExamInfo = (examId) => {
  return api.get(`/exam/${examId}`)
}