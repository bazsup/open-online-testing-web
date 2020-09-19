import React from 'react'
import { Divider } from 'semantic-ui-react'
import { lang } from '../constants'
import RegisterForm from '../components/Register/RegisterForm'
import SocialLogin from '../components/Login/SocialLogin'

const RegisterPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mb-4">
            <div className="card-body">
              <RegisterForm />
              <Divider className="my-4" horizontal>
                {lang.th.or}
              </Divider>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  )  
}

export default RegisterPage
