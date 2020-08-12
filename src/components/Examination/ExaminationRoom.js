import React, { useState, useEffect } from 'react'
import { Card, Checkbox, Radio, Loader } from 'semantic-ui-react'
import styled from '@emotion/styled'
import { color, QUESTIONTYPE } from '../../constants'
import { Statistic } from 'antd'

const { Countdown } = Statistic

const Info = styled.div`
  padding: 10px;
  background-color: ${color.orange};
  color: white;
  font-weight: bold;
`

export default function ExaminationRoom({ examDetail }) {
  const [questions, setQuestions] = useState(null)

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
              label: 'ผมไม่รู้',
            },
            {
              label: 'ไม่รู้',
            },
            {
              label: 'ก็ไม่รู้ ไม่รู้',
            },
            {
              label: 'คุณรู้ไหมละ',
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
  }, [examDetail])

  return (
    <div>
      <Info className='d-flex justify-content-center align-items-center mb-5'>
        เหลือเวลาทำข้อสอบอีก
        <Countdown value={examDetail.endAt} className='ml-2' />
      </Info>
      {questions === null ? (
        <Loader />
      ) : (
        <Card.Group>
          {questions.map((question) => generateQuestionCard(question))}
        </Card.Group>
      )}
    </div>
  )
}

function generateQuestionCard(question) {
  const { name, type, isMultipleChoose } = question

  if (type === QUESTIONTYPE.SUBJECTIVE) {
    return (
      <Card fluid color='orange'>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content>
          <textarea className='w-100' rows={5}></textarea>
        </Card.Content>
      </Card>
    )
  }

  if (type === QUESTIONTYPE.OBJECTIVE && isMultipleChoose) {
    return (
      <Card fluid color='orange'>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content>
          {question.choices.map((choice) => (
            <div>
              <Checkbox label={choice.label} />
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
            <Radio label={choice.label} name='vs' value={choice.label} />
          </div>
        ))}
      </Card.Content>
    </Card>
  )
}

function shuffleQuestion(questions) {
  return questions.sort(() => Math.random() - 0.5)
}
