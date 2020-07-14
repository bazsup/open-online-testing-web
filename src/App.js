import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ManagePage from './pages/manage'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/manage'>
            <ManagePage />
          </Route>
          <Route path='/'>ดีงัฟฟ</Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
