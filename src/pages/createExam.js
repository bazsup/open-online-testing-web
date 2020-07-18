import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import { useForm } from "react-hook-form";
import { Form, Segment, Menu, Label, Search } from "semantic-ui-react";

import * as QuestionService from '../services/question'
import * as ExamService from '../services/exam'

import { PrimaryButton } from "../elements/PrimaryButton";
import { useCallback } from "react";
import { Empty } from "antd";

const ScrollablePane = styled.div`
  height: 250px;
  overflow-y: scroll;
`

const ExamCreatePage = (props) => {
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [questions, setQuestions] = useState([])

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
    exam.questions = selectedQuestions
    ExamService.create(exam)
      .then(() => {
        alert('exam created')
        changeToManageExamPage()
      })
  }
  const handleAddSelectedQuestion = useCallback((item, index) => {
    setQuestions(questions.filter(question => question.id !== item.id))
    setSelectedQuestions([...selectedQuestions, item])
  }, [selectedQuestions, setSelectedQuestions, setQuestions, questions])

  const handleRemoveSelectedQuestion = useCallback((item, index) => {
    setSelectedQuestions(selectedQuestions.filter(question => question.id !== item.id))
    setQuestions([...questions, item])
  }, [selectedQuestions, setSelectedQuestions, setQuestions, questions])

  return (
    <React.Fragment>
      <h1>สร้างข้อสอบ</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <Form.Field>
            <label htmlFor='name'>ชื่อข้อสอบ</label>
            <input
              type='text'
              name='name'
              ref={register({ required: true })}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='description'>รายละเอียดข้อสอบ</label>
            <textarea
              name='description'
              rows='2'
              ref={register}
            ></textarea>
          </Form.Field>
          <Form.Field>
            <label>เลือกคำถาม</label>
            <Segment>
              <div className="row">
                <ScrollableQuestionList
                  title={`คำถามที่เลือกได้`}
                  questions={questions}
                  handleSearch={() => {}}
                  handleItemClick={handleAddSelectedQuestion} 
                  icon={<Label color='teal'>+</Label>}
                />
                <ScrollableQuestionList
                  title={`คำถามที่ถูกเลือก`}
                  questions={selectedQuestions}
                  handleSearch={() => {}}
                  handleItemClick={handleRemoveSelectedQuestion} 
                  icon={<Label color='red'>-</Label>}
                />
              </div>
            </Segment>
          </Form.Field>
          <PrimaryButton className='mt-3'>
            สร้างข้อสอบ
          </PrimaryButton>
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
  icon
}) => (
  <div className="col-6">
    <div>
      <strong>{title} {`(${questions.length})`}</strong>
      <Search
        className='my-3'
        onSearchChange={handleSearch}
      />
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
    {questions.length === 0 && <Empty className='mt-5' />}
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
