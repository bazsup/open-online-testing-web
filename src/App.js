import React from 'react'
import Navbar from './components/Navbar'
import TypeSelector from './components/TypeSelector'

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className='container mt-5'>
        <div className='d-flex justify-content-center'>
          <TypeSelector
            label='จัดการคำถาม'
            img={require('./images/question.svg')}
            active
          />
          <TypeSelector
            label='จัดการข้อสอบ'
            img={require('./images/exam.svg')}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
