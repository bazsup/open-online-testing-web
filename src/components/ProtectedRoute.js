import React from 'react'
import { Route } from 'react-router-dom'
import NotFound from './NotFound'

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {

  return (
    <Route {...rest} render={props => {
      if (isAuthenticated) {
        return <Component {...rest} {...props} />
      } else {
        return <NotFound />
      }
    }} />
  )
}

export default ProtectedRoute
