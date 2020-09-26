import React from 'react'
import { Segment, Accordion } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'

import * as ExamService from '../services/exam'

import ManageNavigation from '../components/Manage/ManageNavigation'
import { SegmentTitle } from '../elements/SegmentTitle'
import { CallToActionButton } from '../elements/CallToActionButton'
import ExamDetailSegment from '../components/ManageExam/ExamDetailSegment'
import { useEffect } from 'react'
import { useState } from 'react'

const ExamList = () => {
  const [exams, setExams] = useState([])
  useEffect(() => {
    const fetchExams = async () => {
      const result = await ExamService.getAll()
      setExams(result.data)
    }
    fetchExams()
  }, [])

  return (
    <React.Fragment>
      <ManageNavigation />
      <div className="row justify-content-md-center mt-3">
        <div className="col-10">
          <Segment className="px-5 py-5">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <SegmentTitle>จัดการข้อสอบ</SegmentTitle>
                  <Link to="/manage/exam/create">
                    <CallToActionButton content="+ สร้างข้อสอบ" />
                  </Link>
                </div>
                <WithEmpty
                  items={exams}
                  children={(items) => (
                    <Segment.Group>
                      {items.map((item) => (
                        <ExamDetailSegment key={item.id} {...item} />
                      ))}
                    </Segment.Group>
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
  if (items.length === 0)
    return (
      <Segment>
        <Empty />
      </Segment>
    )
  return children(items)
}

export default ExamList
