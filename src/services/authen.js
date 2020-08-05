import api from '../api/instance'

export const loginVanila = (loginRequst) => {
    console.log("------------")
    console.log(loginRequst)
  return api.post('/vanila/login/user',loginRequst)
}
