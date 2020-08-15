import api from '../api/instance'

export const login = ({ email, password }) => {
  return api.post('/auth/login/',{
    email,
    password
  })
}
