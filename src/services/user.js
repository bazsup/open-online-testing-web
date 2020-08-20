import api from '../api/instance'

export const getCurrentUser = () => {
  return api.get('/user/me')
}
