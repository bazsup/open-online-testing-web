import React, { useState, useEffect } from 'react'
import { loginVanila } from '../services/authen'
import api from '../api/instance'
import jwtDecode from 'jwt-decode'

const Login = () => {
    const [email, wow] = useState('')
    const [password, wowPassword] = useState('')
    return (
        <div>
            <input name='email' onChange={e => wow(e.target.value)}/>
            <input name='password' type='password' onChange={e=> wowPassword(e.target.value)} />
            <button>submit</button>
        </div>
    )
}

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        loginVanila({
            email, password
        }).then(loginResponse => {
            console.log(loginResponse.status)
            const userJwtToken = loginResponse.data.jwtToken
            console.log(userJwtToken)
            localStorage.setItem("jwtToken", userJwtToken)
            alert(`Login Success Name ${email} 😎😎😎`)
            console.log(jwtDecode(userJwtToken).user.userType)
            api.defaults.headers.common['x-user-type'] = jwtDecode(userJwtToken).user.userType
            

        }).catch(err => {
            alert(`Fail to login 🙄🙄🙄`)
            console.log("login fail")
        })
    }

    const logout = () => {
        alert("Clear cache JWT !!!")
        localStorage.clear()
    }

    return (
        <React.Fragment>
            <div className='row justify-content-md-center mt-3'>
                <span>Email : <input type="text" name='email' value={email} onChange={e => setEmail(e.target.value)} /></span>
                <span>password : <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></span>
                <button onClick={login} class="ui primary button">Login</button>
                <button onClick={logout} class="ui secondary button">Logout</button>
            </div>
        </React.Fragment>
    )
}
