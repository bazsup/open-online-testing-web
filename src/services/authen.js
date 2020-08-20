import api from '../api/instance'
import { JWT_TOKEN } from '../constants'

export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const login = ({ email, password }) => {
  return api.post('/auth/login/',{
    email,
    password
  }).then((response) => {
    const jwtToken = response.data.accessToken
    localStorage.setItem(JWT_TOKEN, jwtToken)
    setToken(jwtToken)
    return response
  })
}

/**
 * Call api to create a user
 * @param {Object} user - The data for creating a user.
 * @param {string} user.name - The fullname of the user
 * @param {string} user.email - The email of the user
 * @param {string} user.password - The password of the user
 */
export const signup = ({ name, email, password }) => {
  return api.post('/auth/signup/', {
    name,
    email,
    password,
  })
}

export const logout = () => {
  return new Promise((resolve) => {
    api.defaults.headers.common['Authorization'] = null
    localStorage.clear()
    resolve()
  })
}
