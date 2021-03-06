import React, { useState, useEffect } from 'react'
import QuestionAccordion from '../components/QuestionAccordion'
import { Segment, Accordion, Search } from 'semantic-ui-react'
import { Empty } from 'antd'
import { Link } from 'react-router-dom'
import ManageNavigation from '../components/Manage/ManageNavigation'
import { CallToActionButton } from '../elements/CallToActionButton'
import { SegmentTitle } from '../elements/SegmentTitle'
import * as questionService from '../services/question'

export default () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await questionService.getAll()
      setQuestions(result.data)
    }
    fetchQuestions()
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
                  <SegmentTitle>จัดการคำถาม</SegmentTitle>
                  <Link to="/manage/question/create">
                    <CallToActionButton content="+ สร้างคำถาม" />
                  </Link>
                </div>
                {questions.length === 0 ? (
                  <Segment>
                    <Empty />
                  </Segment>
                ) : (
                  <React.Fragment>
                    <Search
                      className="mb-3"
                      style={{
                        opacity: 0.5,
                        pointerEvents: 'none',
                      }}
                    />
                    <Accordion fluid styled>
                      {questions.map(
                        ({ name, type, choices, categories }, index) => (
                          <QuestionAccordion
                            name={name}
                            type={type}
                            choices={choices}
                            categories={categories}
                            index={index}
                          />
                        )
                      )}
                    </Accordion>
                  </React.Fragment>
                )}
              </div>
            </div>
          </Segment>
        </div>
      </div>
    </React.Fragment>
  )
}
