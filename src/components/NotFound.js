import React from 'react'
import { Header } from 'semantic-ui-react'

const NotFound = () => (
  <div
    class="d-flex justify-content-center align-items-center"
    style={{ minHeight: '80vh' }}
  >
    <Header as="h1" >
      <span role="img" aria-label="Tries">
        😓
      </span>
      {'  '}
      404 Not Found
    </Header>
  </div>
)

export default NotFound
