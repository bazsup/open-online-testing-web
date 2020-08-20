import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/login'
import ManagePage from './pages/manage'
import ManageExamPage from './pages/manageExam'
import CreateQuestionPage from './pages/createQuestion'
import CreateExamPage from './pages/createExam'
import { UserContext } from './context/user-context'
import RegisterPage from './pages/register'
import JwtDecode from 'jwt-decode'
import * as UserService from './services/user'
import * as AuthenService from './services/authen'
import { JWT_TOKEN } from './constants'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  const fetchUser = useCallback(async () => {
    const response = await UserService.getCurrentUser()
    setIsAuthenticated(true)
    setUser(response.data)
  }, [])

  useEffect(() => {
    const userJwtToken = localStorage.getItem(JWT_TOKEN)
    if (userJwtToken) {
      const decodedJwt = JwtDecode(userJwtToken)
      const isTokenExpired = Date.now() >= decodedJwt.exp * 1000
      if (isTokenExpired) {
        localStorage.removeItem(JWT_TOKEN)
        return
      }

      AuthenService.setToken(userJwtToken)
      fetchUser()      
    }
  }, [fetchUser])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <React.Fragment>
        <Router>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <div className="container mt-5">
            <Switch>
              <Route path="/manage" exact component={ManagePage} />
              <Route path="/manage/exam" exact component={ManageExamPage} />
              <Route
                path="/login"
                exact
                render={() => <Login loadUser={fetchUser} />}
              />
              <Route path="/register" component={RegisterPage} />
              <Route
                path="/manage/question/create"
                component={CreateQuestionPage}
              />
              <Route path="/manage/exam/create" component={CreateExamPage} />
              <Route path="/">ยินดีต้อนรับ</Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    </UserContext.Provider>
  )
}

export default App
