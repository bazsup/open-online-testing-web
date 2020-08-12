import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import { isExaminationEnd } from '../components/Examination/utils'
import ExaminationContainer from '../components/Examination/container'
import { Link } from 'react-router-dom'

const mock = {
  id: 'ma01mdka-asjmu18-duhunS81',
  name: 'ข้อสอบเพิ่มความรู้ชุดที่ 1',
  description:
    'รามาวตารคลื่นเหียนลากข้างเบญกายสีหโมนี มโนกรรมกระบี่ คนใช้ไลบีเรียเนชั่นมอนแทนา ลำปางเพชรบุรีคลื่นเหียนเบลเยียม ล้านช้าง เนคเทค ปทุมธานีพัทลุง โตเบโกโรเบิร์ตชื่อรอง นิด้าอิทธิฤทธิ์หนักข้อ ดีทรอยต์แม่ฮ่องสอนสตอกโฮล์ม อินทราทิตย์กล้ำกรายเทพรัตนน้ำคร่ำนาลันทา ร้อยละพระคุณ ดีแทครัสปูตินยาใจโฮจิมินห์นิสสัน ชื่อรองเบียดเสียดนครราชสีมาตากโนเกีย เอลซัลวาดอร์อุบลราชธานีสง่างาม',
  startAt: '2020-08-12T18:08:00',
  endAt: '2020-08-12T18:26:00',
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
        <ExaminationContainer examDetail={mock} />
      </div>
    </div>
  )
}
