import React, { useState } from 'react'
import LoginForm from '../components/Login/LoginForm'
import SocialLogin from '../components/Login/SocialLogin'
import { Divider, Message, Header } from 'semantic-ui-react'
import { lang } from '../constants'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

export default ({ loadUser }) => {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')

  const handleLoginSuccess = useCallback(() => {
    loadUser()
    history.push('/')
  }, [history, loadUser])

  const handleError = useCallback((message) => {
    setErrorMessage(message)
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <Header className="text-center mb-4" as="h2">
                {lang.th.login}
              </Header>
              {errorMessage !== '' && (
                <Message error className="text-center" header={errorMessage} />
              )}
              <SocialLogin />
              <Divider className="my-4" horizontal>
                {lang.th.or}
              </Divider>
              <LoginForm onSuccess={handleLoginSuccess} onError={handleError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
