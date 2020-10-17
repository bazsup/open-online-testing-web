import React from 'react'
import {
  Card,
  Checkbox,
  Radio,
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react'
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

export default function Examination({
  examDetail,
  onCounterEnd,
  questions,
  answers,
  onChangeAnswer,
  submitExam,
  modalOpen,
  setModalOpen,
}) {
  return (
    <div>
      <Modal
        basic
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        size="small"
        className="w-100"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <Header icon className="text-white">
                <Icon name="save" className="text-white" />
                ยืนยันการส่งคำตอบ
              </Header>
              <Modal.Content>
                <p>
                  คุณยืนยันที่จะส่งคำตอบหรือไม่
                  หากยืนยันแล้วจะไม่สามารถกลับมาแก้คำตอบได้อีก
                </p>
              </Modal.Content>
              <Modal.Actions className="mt-3">
                <Button
                  basic
                  color="red"
                  inverted
                  className="ml-0"
                  onClick={() => setModalOpen(false)}
                >
                  <Icon name="remove" /> ยกเลิก
                </Button>
                <Button color="orange" inverted onClick={submitExam}>
                  <Icon name="checkmark" /> ยืนยัน
                </Button>
              </Modal.Actions>
            </div>
          </div>
        </div>
      </Modal>
      <Info className="d-flex justify-content-center align-items-center mb-5">
        เหลือเวลาทำข้อสอบอีก
        <Countdown
          value={examDetail.endAt}
          className="ml-2"
          onFinish={onCounterEnd}
        />
      </Info>
      <div className="pb-3">
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
        <div className="d-flex justify-content-end">
          <Button
            color="orange"
            className="mt-3"
            onClick={() => setModalOpen(true)}
          >
            ส่งคำตอบ
          </Button>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ question, answers, index, onChangeAnswer }) {
  const { id, name, type, isMultipleChoose } = question

  if (type === QUESTIONTYPE.SUBJECTIVE) {
    return (
      <Card fluid color="orange">
        <Card.Content>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content>
          <textarea
            className="w-100"
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
      <Card fluid color="orange">
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
              />
            </div>
          ))}
        </Card.Content>
      </Card>
    )
  }

  return (
    <Card fluid color="orange">
      <Card.Content>
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content>
        {question.choices.map((choice) => (
          <div>
            <Radio
              label={choice.label}
              name={id.counter}
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
