import React, { useState, useEffect } from 'react'
import {
  Card,
  Checkbox,
  Radio,
  Loader,
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react'
import styled from '@emotion/styled'
import { color, QUESTIONTYPE } from '../../constants'
import { Statistic } from 'antd'

import * as ExaminationService from '../../services/examination'

const { Countdown } = Statistic

const Info = styled.div`
  padding: 10px;
  background-color: ${color.orange};
  color: white;
  font-weight: bold;
`

export default function ExaminationRoom({ examDetail }) {
  const [questions, setQuestions] = useState(null)
  const [answers, setAnswers] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    //use examDetail.id to fetch question
    const mock = {
      shuffleQuestion: true,
      questions: [
        {
          id: '5f0cb92ac72c830800e0ef80',
          name: 'ข้อใดไม่ใช่ Javascript Library',
          isMultipleChoose: false,
          type: 'OBJECTIVE',
          attributes: null,
          choices: [
            {
              label: 'React',
            },
            {
              label: 'Ionic',
            },
            {
              label: 'Vue',
            },
            {
              label: 'Angular',
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
              label: 'ไม่รู้ครับ',
            },
            {
              label: 'ไม่รู้เหมือนกันครับ',
            },
            {
              label: 'ไม่รู้ ไม่รู้',
            },
            {
              label: 'ไม่รู้',
            },
          ],
        },
        {
          id: '5f0cb92ac72c830800e0ef82',
          name: 'จงเล่าพื้นฐานของภาษา Java',
          type: 'SUBJECTIVE',
          attributes: null,
        },
      ],
    }
    if (mock.shuffleQuestion) {
      mock.questions = shuffleQuestion(mock.questions)
    }
    setQuestions(mock.questions)
    const initialAnswers = Array(mock.questions.length).fill([])
    setAnswers(initialAnswers)
  }, [examDetail])

  function onChangeAnswer(index, answer) {
    answers[index] = answer
    setAnswers(answers)
  }

  function getFormatedAnswer() {
    return answers.map((answer, answerIndex) => {
      const question = questions[answerIndex]
      return {
        questionId: question.id,
        questionName: question.name,
        questionType: question.type,
        answer,
      }
    })
  }

  function handleOnSubmitAnswer() {
    const requestBody = getFormatedAnswer()
    console.log('requestBody', requestBody)
  }

  function onCounterEnd() {
    alert(
      'การทำข้อสอบจบลงแล้ว เราได้ส่งคำตอบล่าสุดของคุณเข้าระบบให้เรียบร้อยแล้ว'
    )
    const requestBody = getFormatedAnswer()
    submitExam(requestBody).then(() => {
      redirectPage()
    })
  }

  function redirectPage() {}

  function submitExam(answers) {
    return new Promise((resolve) => {
      console.log(answers)
      resolve()
    })
    // return ExaminationService.submitExamination(answers)
  }

  return (
    <div>
      <Modal
        basic
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        size='small'
        className='w-100'
      >
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-10'>
              <Header icon className='text-white'>
                <Icon name='save' className='text-white' />
                ยืนยันการส่งคำตอบ
              </Header>
              <Modal.Content>
                <p>
                  คุณยืนยันที่จะส่งคำตอบหรือไม่
                  หากยืนยันแล้วจะไม่สามารถกลับมาแก้คำตอบได้อีก
                </p>
              </Modal.Content>
              <Modal.Actions className='mt-3'>
                <Button
                  basic
                  color='red'
                  inverted
                  className='ml-0'
                  onClick={() => setModalOpen(false)}
                >
                  <Icon name='remove' /> ยกเลิก
                </Button>
                <Button
                  color='orange'
                  inverted
                  onClick={() => setModalOpen(false)}
                >
                  <Icon name='checkmark' /> ยืนยัน
                </Button>
              </Modal.Actions>
            </div>
          </div>
        </div>
      </Modal>
      <Info className='d-flex justify-content-center align-items-center mb-5'>
        เหลือเวลาทำข้อสอบอีก
        <Countdown
          value={examDetail.endAt}
          className='ml-2'
          onFinish={onCounterEnd}
        />
      </Info>
      {questions === null ? (
        <Loader />
      ) : (
        <div className='pb-3'>
          <Card.Group>
            {questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                answers={answers}
                index={index}
                onChangeAnswer={onChangeAnswer}
              />
            ))}
          </Card.Group>
          <div className='d-flex justify-content-end'>
            <Button
              color='orange'
              className='mt-3'
              onClick={() => setModalOpen(true)}
            >
              ส่งคำตอบ
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function QuestionCard({ question, answers, index, onChangeAnswer }) {
  const { name, type, isMultipleChoose } = question

  if (type === QUESTIONTYPE.SUBJECTIVE) {
    return (
      <Card fluid color='orange'>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content>
          <textarea
            className='w-100'
            rows={5}
            onChange={(event) => {
              onChangeAnswer(index, [event.target.value])
            }}
          ></textarea>
        </Card.Content>
      </Card>
    )
  }

  if (type === QUESTIONTYPE.OBJECTIVE && isMultipleChoose) {
    const handleChangeObjectiveAnswer = (value) => {
      const answer = answers[index]

      const choiceIndex = answer.indexOf(value)
      const alreadySelectedAnswer = choiceIndex > -1

      const result = alreadySelectedAnswer
        ? answer.filter((ans) => ans !== value)
        : [...answer, value]

      onChangeAnswer(index, result)
    }
    return (
      <Card fluid color='orange'>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content>
          {question.choices.map((choice) => (
            <div>
              <Checkbox
                label={choice.label}
                onChange={() => {
                  handleChangeObjectiveAnswer(choice.label)
                }}
                // checked={answer.includes(choice.label)}
              />
            </div>
          ))}
        </Card.Content>
      </Card>
    )
  }

  return (
    <Card fluid color='orange'>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content>
        {question.choices.map((choice) => (
          <div>
            <Radio
              label={choice.label}
              name='vs'
              value={choice.label}
              onChange={() => {
                onChangeAnswer(index, [choice.label])
              }}
            />
          </div>
        ))}
      </Card.Content>
    </Card>
  )
}

function shuffleQuestion(questions) {
  return questions.sort(() => Math.random() - 0.5)
}
