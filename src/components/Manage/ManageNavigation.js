import React from 'react'
import TypeSelector from '../TypeSelector'

export default () => (
  <div className='d-flex justify-content-center'>
    <TypeSelector to={'/manage'} label='จัดการคำถาม' icon='question' />
    <TypeSelector to={'/manage/exam'} label='จัดการข้อสอบ' icon='exam' />
  </div>
)
