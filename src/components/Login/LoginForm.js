import React, { useState } from 'react'

import { JWT_TOKEN, lang } from '../../constants'
import { login } from '../../services/authen'
import { PrimaryButton } from '../../elements/PrimaryButton'
import { Form, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    login({
      email,
      password,
    })
      .then((loginResponse) => {
        const userJwtToken = loginResponse.data.accessToken
        localStorage.setItem(JWT_TOKEN, userJwtToken)
        alert(lang.th.loginSuccess)
        redirectPageAfterLogin()
      })
      .catch((err) => {
        alert(lang.th.loginFail)
      })
  }

  const redirectPageAfterLogin = () => {}

  return (
    <Form>
      <div className="row justify-content-md-center mt-3">
        <div className="col">
          <Form.Field>
            <label>{lang.th.email}</label>
            <Input
              type="email"
              placeholder={lang.th.email}
              value={email}
              onChange={(e, { value }) => {
                setEmail(value)
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>{lang.th.password}</label>
            <Input
              type="password"
              placeholder={lang.th.password}
              value={password}
              onChange={(e, { value }) => {
                setPassword(value)
              }}
            />
          </Form.Field>
          <PrimaryButton fluid onClick={handleLogin}>
            {lang.th.login}
          </PrimaryButton>
          <p className="mt-2 text-right">
            {`${lang.th.doesNotHaveAnAccount} `}
            <Link to="/register">{lang.th.register}</Link>
          </p>
          {/* <button onClick={logout} class="ui secondary button">
            Logout
          </button> */}
        </div>
      </div>
    </Form>
  )
}

export default LoginForm
