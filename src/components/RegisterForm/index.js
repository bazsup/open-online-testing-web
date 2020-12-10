import React, { useCallback } from 'react'
import { Header, Form } from 'semantic-ui-react'
import { lang } from '../../constants'
import { PrimaryButton } from '../../elements/PrimaryButton'
import { useState } from 'react'
import * as AuthenService from '../../services/authen'
import { Link, useHistory } from 'react-router-dom'

const RegisterForm = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = useCallback(() => {
    const data = {
      name: fullname,
      email,
      password,
    }
    AuthenService.signup(data).then(() => {
      alert(lang.th.registerSuccess)
      history.push('/login')
    })
  }, [email, fullname, history, password])
  return (
    <Form onSubmit={handleSubmit}>
      <Header className='text-center' as="h2">{lang.th.registerTitle}</Header>
      <Form.Field required>
        <label>{lang.th.fullname}</label>
        <input
          placeholder={lang.th.fullname}
          name="fullname"
          required
          onChange={(e) => setFullname(e.target.value)}
        />
      </Form.Field>
      <Form.Field required type="email">
        <label>{lang.th.email}</label>
        <input
          placeholder={lang.th.email}
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Field>
      <Form.Field required type="password">
        <label>{lang.th.password}</label>
        <input
          placeholder={lang.th.password}
          type="password"
          name="password"
          required
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
          onChange={(e) => {
            e.target.setCustomValidity('')
            setPassword(e.target.value)
          }}
          onInvalid={(e) => {
            e.target.setCustomValidity(lang.th.passwordHint)
          }}
        />
        <small>
          {lang.th.passwordHint}
          {lang.th.passwordHintCheckList.map((item) => (
            <div key={item}>{`• ${item}`}</div>
          ))}
        </small>
      </Form.Field>
      <PrimaryButton fluid>{lang.th.register}</PrimaryButton>
      <p className="mt-3 text-center">
        {`${lang.th.alreadyHaveAccount} `}
        <Link to="/login">{lang.th.login}</Link>
      </p>
    </Form>
  )
}

export default RegisterForm
