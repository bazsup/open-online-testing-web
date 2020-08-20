import React from 'react'
import RegisterForm from '../components/Register/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )  
}

export default RegisterPage
