import React from 'react'
import LoginForm from '../components/Login/LoginForm'
import SocialLogin from '../components/Login/SocialLogin'
import { Divider } from 'semantic-ui-react'
import { lang } from '../constants'

export default () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <SocialLogin />
              <Divider className='my-4' horizontal>{lang.th.or}</Divider>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
