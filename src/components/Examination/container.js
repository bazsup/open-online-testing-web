import React, { useState } from 'react'
import dayjs from 'dayjs'

import { toast } from '../../libs/toast'
import Examination from './index'
import ExaminationWaitingRoom from '../ExaminationWaitingRoom'

export default function ExaminationContainer({ examDetail }) {
  const [isEnterExamRoom, setIsEnterExamRoom] = useState(false)
  const [isAgreeTerm, setIsAgreeTerm] = useState(false)

  const handleSetIsEnterExamRoom = () => {
    const now = dayjs()
    const examStart = dayjs(examDetail.startAt)
    const examEnd = dayjs(examDetail.endAt)
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

  if (!isEnterExamRoom) {
    return (
      <ExaminationWaitingRoom
        examDetail={examDetail}
        isAgreeTerm={isAgreeTerm}
        setIsAgreeTerm={setIsAgreeTerm}
        handleSetIsEnterExamRoom={handleSetIsEnterExamRoom}
      />
    )
  }
  return <Examination examDetail={examDetail} />
}
