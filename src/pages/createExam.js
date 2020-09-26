import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { Form, Segment, Menu, Label } from 'semantic-ui-react'

import * as QuestionService from '../services/question'
import * as ExamService from '../services/exam'

import { PrimaryButton } from '../elements/PrimaryButton'
import { useCallback } from 'react'
import { DatePicker, Empty } from 'antd'
import CreateCategory from '../components/Manage/CreateCategory'
import { toast } from '../libs/toast'
import moment from 'moment'

const ScrollablePane = styled.div`
  height: 250px;
  overflow-y: scroll;
`

const ExamCreatePage = (props) => {
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [questions, setQuestions] = useState([])
  const [categories, setCategories] = useState([])
  const [startAt, setStartAt] = useState(null)
  const [endAt, setEndAt] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await QuestionService.getAll()
      setQuestions(result.data)
    }
    fetchQuestions()
  }, [])

  const changeToManageExamPage = () => {
    props.history.push('/manage/exam')
  }

  const { register, handleSubmit } = useForm()
  const onSubmit = (exam) => {
    if (startAt === null || endAt === null) {
      return toast.error('กรุณาเลือกเวลาเริ่มสอบ - สิ้นสุด ให้เรียบร้อย')
    }
    exam.questions = selectedQuestions
    exam.categories = categories
    exam.startAt = startAt.toISOString()
    exam.endAt = endAt.toISOString()
    ExamService.create(exam)
      .then(() => {
        toast.success('สร้างชุดข้อสอบสำเร็จ')
        changeToManageExamPage()
      })
      .catch(() => {
        toast.error('สร้างชุดข้อสอบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
      })
  }
  const handleAddSelectedQuestion = useCallback(
    (item) => {
      setQuestions(questions.filter((question) => question.id !== item.id))
      setSelectedQuestions([...selectedQuestions, item])
    },
    [selectedQuestions, setSelectedQuestions, setQuestions, questions]
  )

  const handleRemoveSelectedQuestion = useCallback(
    (item) => {
      setSelectedQuestions(
        selectedQuestions.filter((question) => question.id !== item.id)
      )
      setQuestions([...questions, item])
    },
    [selectedQuestions, setSelectedQuestions, setQuestions, questions]
  )

  const handleCategoriesChange = useCallback(
    (categories) => {
      setCategories(categories)
    },
    [setCategories]
  )

  const disabledDate = (current) => {
    return current < moment().subtract(1, 'days')
  }

  const onStartAtDateTimeChange = (value) => {
    setStartAt(value)
  }

  const onEndAtDateTimeChange = (value) => {
    setEndAt(value)
  }

  return (
    <React.Fragment>
      <h1>สร้างข้อสอบ</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <Form.Field>
            <label htmlFor="name">ชื่อข้อสอบ</label>
            <input
              type="text"
              name="name"
              ref={register({ required: true })}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="description">รายละเอียดข้อสอบ</label>
            <textarea name="description" rows="2" ref={register}></textarea>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>เริ่มสอบ</label>
              <DatePicker
                className="w-100"
                showTime
                name="startAt"
                disabledDate={disabledDate}
                onChange={onStartAtDateTimeChange}
              />
            </Form.Field>
            <Form.Field>
              <label>สิ้นสุดการสอบ</label>
              <DatePicker
                className="w-100"
                showTime
                disabledDate={disabledDate}
                onChange={onEndAtDateTimeChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>เลือกคำถาม</label>
            <Segment>
              <div className="row">
                <ScrollableQuestionList
                  title={`คำถามที่เลือกได้`}
                  questions={questions}
                  handleSearch={() => {}}
                  handleItemClick={handleAddSelectedQuestion}
                  icon={<Label color="teal">+</Label>}
                />
                <ScrollableQuestionList
                  title={`คำถามที่ถูกเลือก`}
                  questions={selectedQuestions}
                  handleSearch={() => {}}
                  handleItemClick={handleRemoveSelectedQuestion}
                  icon={<Label color="red">-</Label>}
                />
              </div>
            </Segment>
          </Form.Field>
          <CreateCategory
            title={'ประเภทของคำถาม'}
            onCategoriesChange={handleCategoriesChange}
          />
          <PrimaryButton className="mt-3">สร้างข้อสอบ</PrimaryButton>
        </Segment>
      </Form>
    </React.Fragment>
  )
}

const ScrollableQuestionList = ({
  title,
  questions,
  handleSearch,
  handleItemClick,
  icon,
}) => (
  <div className="col-6">
    <div className="mb-3">
      <strong>
        {title} {`(${questions.length})`}
      </strong>
    </div>
    <ScrollablePane>
      <QuestionList
        questions={questions}
        handleClick={handleItemClick}
        icon={icon}
      />
    </ScrollablePane>
  </div>
)

const QuestionList = ({ questions, handleClick, icon }) => (
  <Menu fluid vertical style={{ minHeight: 250 }}>
    {questions.length === 0 && <Empty className="mt-5" />}
    {questions.map((question, index) => (
      <Menu.Item
        key={question.id}
        name={question.id}
        onClick={() => handleClick(question, index)}
      >
        {icon}
        {question.name}
      </Menu.Item>
    ))}
  </Menu>
)

export default ExamCreatePage
