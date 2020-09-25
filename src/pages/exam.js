import React, { useState, useEffect } from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import { isExaminationEnd } from '../components/Examination/utils'
import ExaminationContainer from '../components/Examination/container'
import { Link } from 'react-router-dom'
import * as examinationService from '../services/examination'
import { useParams, useHistory } from "react-router-dom";
import { toast } from '../libs/toast'


export default () => {
  const { examId } = useParams()
  const history = useHistory()
  const [exam, setExam] =  useState(null)

  useEffect(() => {
    examinationService.getExamInfo(examId).then((response) => {
      setExam(response.data)
    }).catch(() => {
      toast.error('เกิดข้อผิดพลาดในการดึงข้อสอบ กรุณาลองใหม่ในภายหลัง')
      return history.push('/')
    })
  }, [examId, history])

  if(exam === null) {
    return <React.Fragment></React.Fragment>
  }

  const isExaminationAlreadyEnd = isExaminationEnd(exam.endAt)
  if (isExaminationAlreadyEnd) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='clock outline' />
          {exam.name} หมดเวลาทำข้อสอบเรียบร้อยแล้ว
        </Header>
        <Link to='/'>
          <Button color='orange' className='mt-2'>
            กลับสู่หน้าหลัก
          </Button>
        </Link>
      </Segment>
    )
  }

  return (
    <div className='row justify-content-md-center'>
      <div className='col-10'>
        <ExaminationContainer examDetail={exam} />
      </div>
    </div>
  )
}
