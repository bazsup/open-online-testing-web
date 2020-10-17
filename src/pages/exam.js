import React, { useState, useEffect } from 'react'

import dayjs from 'dayjs'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Segment, Header, Icon, Button, Loader } from 'semantic-ui-react'

import { toast } from '../libs/toast'
import * as examinationService from '../services/examination'
import { isExaminationEnd } from '../components/Examination/utils'
import ExaminationContainer from '../components/Examination/container'
import ExaminationWaitingRoom from '../components/ExaminationWaitingRoom'

export default () => {
  const { examId } = useParams()
  const history = useHistory()
  const [exam, setExam] = useState(null)
  const [isEnterExamRoom, setIsEnterExamRoom] = useState(false)
  const [isAgreeTerm, setIsAgreeTerm] = useState(false)

  useEffect(() => {
    examinationService
      .getExamInfo(examId)
      .then((response) => {
        setExam(response.data)
      })
      .catch(() => {
        toast.error('เกิดข้อผิดพลาดในการดึงข้อสอบ กรุณาลองใหม่ในภายหลัง')
        return history.push('/')
      })
  }, [examId, history])

  function handleSetIsEnterExamRoom() {
    const now = dayjs()
    const examStart = dayjs(exam.startAt)
    const examEnd = dayjs(exam.endAt)
    const canEntryExamRoom = examStart <= now && now <= examEnd
    const beforeExamTime = now < examStart
    const afterExamTime = now > examEnd

    if (beforeExamTime) {
      toast.error('ไม่สามารถเข้าสู่ห้องสอบก่อนเวลาได้')
    }
    if (afterExamTime) {
      toast.error('การสอบสิ้นสุดลงแล้ว')
    }
    if (canEntryExamRoom) {
      toast.info('เข้าสู่ห้องสอบ')
      setIsEnterExamRoom(true)
    }
  }

  if (exam === null) {
    return <Loader />
  }

  const isExaminationAlreadyEnd = isExaminationEnd(exam.endAt)
  if (isExaminationAlreadyEnd) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="clock outline" />
          {exam.name} หมดเวลาทำข้อสอบเรียบร้อยแล้ว
        </Header>
        <Link to="/">
          <Button color="orange" className="mt-2">
            กลับสู่หน้าหลัก
          </Button>
        </Link>
      </Segment>
    )
  }

  if (!isEnterExamRoom) {
    return (
      <ExaminationWaitingRoom
        examDetail={exam}
        isAgreeTerm={isAgreeTerm}
        setIsAgreeTerm={setIsAgreeTerm}
        handleSetIsEnterExamRoom={handleSetIsEnterExamRoom}
      />
    )
  }

  return (
    <div className="row justify-content-md-center">
      <div className="col-10">
        <ExaminationContainer examDetail={exam} />
      </div>
    </div>
  )
}
