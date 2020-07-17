import React from 'react'
import ManageNavigation from '../components/Manage/ManageNavigation'
import { Segment, Accordion } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'
import { SegmentTitle } from '../elements/SegmentTitle'
import { CallToActionButton } from '../elements/CallToActionButton'
import ExamAccordion from '../components/ManageExam/ExamAccordion'

const exams = [
  {
    id: 1,
    "name": "ข้อสอบเพิ่มความรู้ชุดที่ 1",
    "description": "set A 1",
    "questions": [
      {
        "id": "5f0cb92ac72c830800e0ef80",
        "name": "If you have 20 harems, what place that you must go?",
        "type": "OBJECTIVE",
        "attributes": null,
        "choices": [
          {
            "label": "Berlin",
            "isCorrectAnswer": false
          },
          {
            "label": "Leipzig",
            "isCorrectAnswer": false
          },
          {
            "label": "Munich",
            "isCorrectAnswer": true
          },
          {
            "label": "Zurich",
            "isCorrectAnswer": false
          }
        ]
      }
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
    ]
  },
  {
    id: 2,
    "name": "ข้อสอบเพิ่มความรู้ชุดที่ 2",
    "description": "set B 1",
    "questions": [
      {
        "id": "5f0cb92ac72c830800e0ef80",
        "name": "If you have 20 harems, what place that you must go?",
        "type": "OBJECTIVE",
        "attributes": null,
        "choices": [
          {
            "label": "Berlin",
            "isCorrectAnswer": false
          },
          {
            "label": "Leipzig",
            "isCorrectAnswer": false
          },
          {
            "label": "Munich",
            "isCorrectAnswer": true
          },
          {
            "label": "Zurich",
            "isCorrectAnswer": false
          }
        ]
      }
    ],
    categories: [
      {
        label: 'programming',
        backgroundColor: '#2d2a4a',
        color: '#ffffff',
      },
    ]
  }
]

const ExamList = () => {
  return (
    <React.Fragment>
      <ManageNavigation />
      <div className='row justify-content-md-center mt-3'>
        <div className="col-10">
          <Segment className='px-5 py-5'>
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <SegmentTitle>จัดการข้อสอบ</SegmentTitle>
                  <Link>
                    <CallToActionButton content='+ สร้างข้อสอบ' />
                  </Link>
                </div>
                <WithEmpty
                  items={exams}
                  children={(items) => (
                    <Accordion fluid styled>
                      {items.map(item => (
                        <ExamAccordion
                          key={item.id}
                          {...item}
                        />
                      ))}
                    </Accordion>
                  )}
                />
              </div>
            </div>
          </Segment>
        </div>
      </div>
    </React.Fragment>
  )
}


const WithEmpty = ({ items, children }) => {
  if (items.length === 0) return (
    <Segment>
      <Empty />
    </Segment>
  )
  return children(items)
}

export default ExamList
