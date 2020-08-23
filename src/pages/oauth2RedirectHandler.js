import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { JWT_TOKEN } from '../constants'
// import { Redirect } from 'react-router-dom'

const Oauth2RedirectHandler = () => {
  // const [loading, setLoading] = use
  const history = useHistory()
  const searchParams = new URLSearchParams(history.location.search)
  const hasToken = searchParams.has('token')

  if (hasToken) {
    localStorage.setItem(JWT_TOKEN, searchParams.get('token'))
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }
  return <Redirect to="/login" />
}

export default Oauth2RedirectHandler
