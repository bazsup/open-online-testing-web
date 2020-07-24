import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Segment,
  Form,
  Input,
  Label,
  Button,
  Dropdown as UnstyledDropdown,
  Checkbox,
} from 'semantic-ui-react'
import { Radio } from 'antd'
import styled from '@emotion/styled'
import { color } from '../constants'
import * as questionService from '../services/question'
import CreateCategory from '../components/Manage/CreateCategory'

const RadioButton = styled(Radio.Button)`
  background-color: ${(props) => props.active && color.orange} !important;
  border-color: ${(props) => props.active && color.orange} !important;

  &:hover {
    color: ${(props) => !props.active && color.orange} !important;
  }
`

const QUESTIONTYPE = {
  OBJECTIVE: 'OBJECTIVE',
  SUBJECTIVE: 'SUBJECTIVE',
}

const createArray = (length) => {
  return Array.from({ length }, (_, k) => k + 1)
}

const getChoiceField = (register) => {
  const choicesAmount = 4

  return createArray(choicesAmount).map((choiceNumber, index) => (
    <Form.Field index={index}>
      <Input labelPosition='left' type='text'>
        <Label basic>{choiceNumber}</Label>
        <input
          name={`choices[${index}].label`}
          ref={register({ required: true })}
        />
      </Input>
    </Form.Field>
  ))
}


export default () => {
  const { register, handleSubmit } = useForm()

  const [type, setType] = useState(QUESTIONTYPE.OBJECTIVE)
  const [categories, setCategories] = useState([])
  const [correctChoice, setCorrectChoice] = useState([
    false,
    false,
    false,
    false,
  ])

  const handleOnCheckboxChange = (_, { value }) => {
    correctChoice[value - 1] = !correctChoice[value - 1]
    setCorrectChoice(correctChoice)
  }

  const handleCategoriesChange = useCallback((categories) => {
    setCategories(categories)
  }, [setCategories])

  const onSubmit = (data) => {
    if (type === QUESTIONTYPE.OBJECTIVE) {
      data.choices.map((choice, index) => {
        choice.isCorrectAnswer = correctChoice[index]
      })
    }

    data.categories = categories
    data.type = type

    questionService
      .createQuestion(data)
      .then(() => alert('สร้างคำถามสำเร็จ'))
      .catch((e) => {
        alert('สร้างคำถามไม่สำเร็จ')
        console.log('error', e)
      })
  }

  return (
    <React.Fragment>
      <h1>สร้างคำถาม</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <Form.Field>
            <label>คำถาม</label>
            <input
              placeholder=''
              name='name'
              ref={register({ required: true })}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>ประเภทคำถาม</label>
            <Radio.Group
              defaultValue={QUESTIONTYPE.OBJECTIVE}
              buttonStyle='solid'
              onChange={(e) => setType(e.target.value)}
            >
              <RadioButton
                active={type === QUESTIONTYPE.OBJECTIVE}
                value={QUESTIONTYPE.OBJECTIVE}
              >
                ปรนัย
              </RadioButton>
              <RadioButton
                active={type === QUESTIONTYPE.SUBJECTIVE}
                value={QUESTIONTYPE.SUBJECTIVE}
              >
                อัตนัย
              </RadioButton>
            </Radio.Group>
          </Form.Field>
          {type === QUESTIONTYPE.OBJECTIVE && getChoiceField(register)}
          {type === QUESTIONTYPE.OBJECTIVE && (
            <Form.Group inline>
              <label>ชอยซ์ทีถูก</label>
              <Form.Field
                control={Checkbox}
                label='1'
                value={1}
                onChange={handleOnCheckboxChange}
              />
              <Form.Field
                control={Checkbox}
                label='2'
                value={2}
                onChange={handleOnCheckboxChange}
              />
              <Form.Field
                control={Checkbox}
                label='3'
                value={3}
                onChange={handleOnCheckboxChange}
              />
              <Form.Field
                control={Checkbox}
                label='4'
                value={4}
                onChange={handleOnCheckboxChange}
              />
            </Form.Group>
          )}
          <CreateCategory title={'ประเภทของคำถาม'} onCategoriesChange={handleCategoriesChange} />
          <Button color='orange' className='mt-3'>
            สร้างคำถาม
          </Button>
        </Segment>
      </Form>
    </React.Fragment>
  )
}
