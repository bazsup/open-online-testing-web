import React from 'react'
import TypeSelector from '../components/TypeSelector'
import QuestionAccordion from '../components/QuestionAccordion'
import {
  Segment,
  Button as UnstyleButton,
  Accordion,
  Search,
} from 'semantic-ui-react'
import styled from '@emotion/styled'
import { Empty } from 'antd'
import { color } from '../constants'
import { Link } from 'react-router-dom'

const Title = styled.h2`
  font-size: 24px;
  display: inline-block;
  margin: 0;
`

const Button = styled(UnstyleButton)`
  background-color: ${color.purple} !important;
  color: white !important;
`

const data = [
  {
    id: 1,
    name: 'If you have 20 harems, what place that you must go?',
    type: 'OBJECTIVE',
    choices: [
      {
        id: 1,
        label: 'Berlin',
        isCorrectAnswer: false,
      },
      {
        id: 2,
        label: 'Leipzig',
        isCorrectAnswer: false,
      },
      {
        id: 3,
        label: 'Munich',
        isCorrectAnswer: true,
      },
      {
        id: 4,
        label: 'Zurich',
        isCorrectAnswer: false,
      },
    ],
    categories: [
      {
        label: 'history',
        backgroundColor: '#2d2a4a',
        color: '#ffffff',
      },
    ],
  },
  {
    id: 2,
    name: 'Why 1+1 = 10 in your opinion?',
    type: 'SUBJECTIVE',
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
    ],
  },
]

export default () => (
  <React.Fragment>
    <div className='d-flex justify-content-center'>
      <TypeSelector label='จัดการคำถาม' icon='question' active />
      <TypeSelector label='จัดการข้อสอบ' icon='exam' />
    </div>
    <div className='row justify-content-md-center mt-3'>
      <div className='col-10'>
        <Segment className='px-5 py-5'>
          <div className='row'>
            <div className='col-9'>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <Title>จัดการคำถาม</Title>
                <Link to='/manage/question/create'>
                  <Button content='+ สร้างคำถาม' />
                </Link>
              </div>
              {data.length === 0 ? (
                <Segment>
                  <Empty />
                </Segment>
              ) : (
                <React.Fragment>
                  <Search className='mb-3' />
                  <Accordion fluid styled>
                    {data.map(({ name, type, choices, categories }, index) => (
                      <QuestionAccordion
                        name={name}
                        type={type}
                        choices={choices}
                        categories={categories}
                        index={index}
                      />
                    ))}
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
