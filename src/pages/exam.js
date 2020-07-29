import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import { isExaminationEnd } from '../components/Examination/utils'
import ExaminationContainer from '../components/Examination/container'
import { Link } from 'react-router-dom'

const mock = {
  name: 'ข้อสอบเพิ่มความรู้ชุดที่ 1',
  description:
    'รามาวตารคลื่นเหียนลากข้างเบญกายสีหโมนี มโนกรรมกระบี่ คนใช้ไลบีเรียเนชั่นมอนแทนา ลำปางเพชรบุรีคลื่นเหียนเบลเยียม ล้านช้าง เนคเทค ปทุมธานีพัทลุง โตเบโกโรเบิร์ตชื่อรอง นิด้าอิทธิฤทธิ์หนักข้อ ดีทรอยต์แม่ฮ่องสอนสตอกโฮล์ม อินทราทิตย์กล้ำกรายเทพรัตนน้ำคร่ำนาลันทา ร้อยละพระคุณ ดีแทครัสปูตินยาใจโฮจิมินห์นิสสัน ชื่อรองเบียดเสียดนครราชสีมาตากโนเกีย เอลซัลวาดอร์อุบลราชธานีสง่างาม',
  isAdaptiveExam: false,
  startAt: '2020-07-29T13:00:00',
  endAt: '2020-07-30T19:00:00',
  questions: [
    {
      id: '5f0cb92ac72c830800e0ef80',
      name: 'สายการบินอะไรมีบริการบินฟรี ไป-กลับ จาก DE to TH?',
      isMultipleChoose: false,
      type: 'OBJECTIVE',
      attributes: null,
      choices: [
        {
          label: 'นกแอร์',
        },
        {
          label: 'แอร์เอเชีย',
        },
        {
          label: 'ไทยไลอ้อนแอร์',
        },
        {
          label: 'การบินไทย',
        },
      ],
    },
    {
      id: '5f0cb92ac72c830800e0ef81',
      name: 'อะไรเอ่ย?',
      isMultipleChoose: true,
      type: 'OBJECTIVE',
      attributes: null,
      choices: [
        {
          label: 'ผมไม่รู้',
        },
        {
          label: 'ก็บอกว่าไม่รู้',
        },
        {
          label: 'ก็ไม่รู้ ไม่รู้',
        },
        {
          label: 'คุณรู้ไหมละ ไปถามหมอดู',
        },
      ],
    },
    {
      id: '5f0cb92ac72c830800e0ef82',
      name: 'คุณคิดว่าใครเป็นบิดาแห่งการยกเว้น เพราะอะไร?',
      type: 'SUBJECTIVE',
      attributes: null,
    },
  ],
  categories: [
    {
      label: 'computer',
      backgroundColor: '#2d2a4a',
      color: '#ffffff',
    },
    {
      label: 'math',
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  ],
}

export default () => {
  const isExaminationAlreadyEnd = isExaminationEnd(mock.endAt)
  if (isExaminationAlreadyEnd) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='clock outline' />
          {mock.name} หมดเวลาทำข้อสอบเรียบร้อยแล้ว
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
        <ExaminationContainer data={mock} />
      </div>
    </div>
  )
}
