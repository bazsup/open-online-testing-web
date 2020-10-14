import React from 'react'

import { SegmentTitle } from '../../elements/SegmentTitle'
import { Segment, Checkbox, Button } from 'semantic-ui-react'
import { getExaminationDateFormat } from '../Examination/utils'

const TERM_AND_CONDITION = `ข้อตกลงของการสอบออนไลน์`

const ExaminationWaitingRoom = ({
  examDetail: { name, description, startAt, endAt },
  isAgreeTerm,
  setIsAgreeTerm,
  handleSetIsEnterExamRoom,
}) => (
  <Segment className="p-5">
    <SegmentTitle className="mt-2">{name}</SegmentTitle>
    <p className="my-3">
      <strong>รายละเอียดของข้อสอบ </strong>
      {description}
    </p>
    <strong>เริ่มสอบ{getExaminationDateFormat(startAt, endAt)}</strong>
    <textarea className="w-100 my-3" rows={12} readOnly>
      {TERM_AND_CONDITION}
    </textarea>
    <div className="d-flex justify-content-between">
      <Checkbox
        label="ยอมรับข้อตกลงและกฏระเบียบการสอบ"
        onChange={() => setIsAgreeTerm(!isAgreeTerm)}
      />
      <Button
        color="orange"
        disabled={!isAgreeTerm}
        onClick={handleSetIsEnterExamRoom}
      >
        เข้าห้องสอบ
      </Button>
    </div>
  </Segment>
)

export default ExaminationWaitingRoom
