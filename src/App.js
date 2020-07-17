import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ManagePage from './pages/manage'
import ManageExamPage from './pages/manageExam'
import CreateQuestionPage from './pages/createQuestion'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className='container mt-5'>
          <Switch>
            <Route path='/manage' exact component={ManagePage} />
            <Route path='/manage/exam' exact component={ManageExamPage} />
            <Route
              path='/manage/question/create'
              component={CreateQuestionPage}
            />
            <Route path='/'>ดีงัฟฟ</Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  )
}

export default App
