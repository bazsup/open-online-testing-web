import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import api from './api/instance'
import Navbar from './components/Navbar'
import Login from './pages/login'
import ManagePage from './pages/manage'
import ManageExamPage from './pages/manageExam'
import CreateQuestionPage from './pages/createQuestion'
import CreateExamPage from './pages/createExam'

// class App extends PureComponent {
//   componentDidMount() {
    
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Router>
//           <Navbar />
//           <div className='container mt-5'>
//             <Switch>
//               <Route path='/manage' exact component={ManagePage} />
//               <Route path='/manage/exam' exact component={ManageExamPage} />
//               <Route path='/login' exact component={Login} />
//               <Route
//                 path='/manage/question/create'
//                 component={CreateQuestionPage}
//               />
//               <Route
//                 path='/manage/exam/create'
//                 component={CreateExamPage}
//               />
//               <Route path='/'>ดีงัฟฟ</Route>
//             </Switch>
//           </div>
//         </Router>
//       </React.Fragment>
//     )
//   }
// }


function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className='container mt-5'>
          <Switch>
            <Route path='/manage' exact component={ManagePage} />
            <Route path='/manage/exam' exact component={ManageExamPage} />
            <Route path='/login' exact component={Login} />
            <Route
              path='/manage/question/create'
              component={CreateQuestionPage}
            />
            <Route
              path='/manage/exam/create'
              component={CreateExamPage}
            />
            <Route path='/'>ดีงัฟฟ</Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  )
}

export default App
