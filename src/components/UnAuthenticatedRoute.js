import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnAuthenticatedRoute = ({ component: Component, isAuthenticated, ...rest }) => {

  return (
    <Route {...rest} render={props => {
      if (!isAuthenticated) {
        return <Component {...rest} {...props} />
      } else {
        return <Redirect to='/' />
      }
    }} />
  )
}

export default UnAuthenticatedRoute
