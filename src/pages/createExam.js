import React, { useState, useEffect } from "react";
import styled from '@emotion/styled'
import { useForm } from "react-hook-form";
import { Form, Segment, Menu, Label, Search } from "semantic-ui-react";
import { PrimaryButton } from "../elements/PrimaryButton";
import { useCallback } from "react";
import { Empty } from "antd";

const ScrollablePane = styled.div`
  height: 250px;
  overflow-y: scroll;
`

const questionList = [
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
  },
  {
    "id": "2",
    "name": "Why 1+1 = 10 in your opinion?",
    "type": "SUBJECTIVE"
  },
  {
    "id": "3",
    "name": "Why 2+2 = 4 in your opinion?",
    "type": "SUBJECTIVE"
  }
]

const getQuestions = () => {
  const otherQuestions = Array(20).fill(null).map((_, index) => {
    return {
      ...questionList[2],
      id: questionList[2].id + index + 1,
      name: questionList[2].name + ' ' + (index + 1)
    }
  })
  return questionList.concat(otherQuestions)
}

const ExamCreatePage = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [questions, setQuestions] = useState([])

  const { register, handleSubmit } = useForm()
  const onSubmit = (exam) => {
    exam.questions = selectedQuestions
    console.log(exam)
  }
  const handleAddSelectedQuestion = useCallback((item, index) => {
    setQuestions(questions.filter(question => question.id !== item.id))
    setSelectedQuestions([...selectedQuestions, item])
  }, [selectedQuestions, setSelectedQuestions, setQuestions, questions])

  const handleRemoveSelectedQuestion = useCallback((item, index) => {
    setSelectedQuestions(selectedQuestions.filter(question => question.id !== item.id))
    setQuestions([...questions, item])
  }, [selectedQuestions, setSelectedQuestions, setQuestions, questions])

  useEffect(() => {
    setQuestions(getQuestions())
  }, [])

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
                  title={`คำถามที่ถูกเลือก`}
                  questions={selectedQuestions}
                  handleSearch={() => {}}
                  handleItemClick={handleRemoveSelectedQuestion} 
                  icon={<Label color='red'>-</Label>}
                />
                <ScrollableQuestionList
                  title={`คำถามที่เลือกได้`}
                  questions={questions}
                  handleSearch={() => {}}
                  handleItemClick={handleAddSelectedQuestion} 
                  icon={<Label color='teal'>+</Label>}
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
