import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Examination from './index'
import { toast } from '../../libs/toast'
import * as examinationService from '../../services/examination'
import { Loader } from 'semantic-ui-react'

export default function ExaminationContainer({ examDetail }) {
  const { examId } = useParams()
  const history = useHistory()
  const [questions, setQuestions] = useState(null)
  const [answers, setAnswers] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    examinationService
      .getExamQuestion(examId)
      .then((response) => {
        const {
          data: { questions },
        } = response
        const initialAnswers = Array(questions.length).fill([])
        setAnswers(initialAnswers)
        setQuestions(questions)
      })
      .catch(() => {
        toast.error('เกิดข้อผิดพลาดในการดึงข้อสอบ กรุณาลองใหม่ในภายหลัง')
        history.push('/')
      })
  }, [examDetail, examId, history])

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

  function onCounterEnd() {
    toast.info('การทำข้อสอบจบลงแล้ว ระบบกำลังส่งคำตอบให้คุณอัตโนมัติ')
    submitExam()
  }

  function submitExam() {
    const answers = getFormatedAnswer()
    examinationService
      .submitExamination(examId, answers)
      .then(() => {
        toast.success('ทำการส่งคำตอบเรียบร้อย')
        history.push('/')
      })
      .catch(() => toast.error('เกิดปัญหาในการส่งคำตอบ กรุณาลองใหม่อีกครั้ง'))
  }

  if (questions === null) {
    return <Loader />
  }

  return (
    <Examination
      examDetail={examDetail}
      onCounterEnd={onCounterEnd}
      questions={questions}
      answers={answers}
      onChangeAnswer={onChangeAnswer}
      submitExam={submitExam}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
