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
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import UnAuthenticatedRoute from './components/UnAuthenticatedRoute'
import Oauth2RedirectHandler from './pages/oauth2RedirectHandler'

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
      try {
        const decodedJwt = JwtDecode(userJwtToken)
        const isTokenExpired = Date.now() >= decodedJwt.exp * 1000
        if (isTokenExpired) {
          localStorage.removeItem(JWT_TOKEN)
          return
        }
  
        AuthenService.setToken(userJwtToken)
        fetchUser()
      } catch (error) {
        // ignore error
      }
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
              <Route exact path="/">
                ยินดีต้อนรับ
              </Route>
              <UnAuthenticatedRoute
                path="/login"
                exact
                component={Login}
                isAuthenticated={isAuthenticated}
                loadUser={fetchUser}
              />
              <UnAuthenticatedRoute path="/register" component={RegisterPage} />
              <ProtectedRoute path="/manage" exact component={ManagePage} />
              <ProtectedRoute
                path="/manage/exam"
                exact
                component={ManageExamPage}
              />
              <ProtectedRoute
                path="/manage/question/create"
                component={CreateQuestionPage}
              />
              <ProtectedRoute
                path="/manage/exam/create"
                component={CreateExamPage}
              />
              <Route path="/oauth2/redirect" component={Oauth2RedirectHandler} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    </UserContext.Provider>
  )
}

export default App
