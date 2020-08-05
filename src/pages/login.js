import React, { useState, useEffect } from 'react'
import * as questionService from '../services/question'
import { loginVanila } from '../services/authen'
import api from '../api/instance'
import jwtDecode from 'jwt-decode'
export default () => {
    const [questions, setQuestions] = useState([])

    const [count, setCount] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await questionService.getAll()
            setQuestions(result.data)
        }
        fetchQuestions()
    }, [setQuestions])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (evt) => {
        // evt.preventDefault();
        loginVanila({
            email, password
        }).then(loginResponse => {
            console.log(loginResponse.status)
            let userJwtToken = loginResponse.data.jwtToken
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

    const logout = (evt)=>{
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
