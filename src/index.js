import React from 'react'
import ReactDOM from 'react-dom'

import { Helmet } from 'react-helmet'
import * as serviceWorker from './serviceWorker'

import './fonts/Anuphan/style.css'
import './fonts/Icomoon/style.css'
import 'antd/dist/antd.css'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
        integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://i.icomoon.io/public/temp/7baef22a04/UntitledProject/style.css"
      ></link>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
        integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
        crossorigin="anonymous"
      ></script>
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
