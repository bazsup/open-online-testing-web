import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import {
  Segment,
  Form,
  Button,
  Dropdown as UnstyledDropdown,
} from 'semantic-ui-react'
import { Radio } from 'antd'
import styled from '@emotion/styled'
import { color } from '../constants'
import * as questionService from '../services/question'
import ObjectiveChoiceInput from '../components/ObjectiveChoiceInput'

const Dropdown = styled(UnstyledDropdown)`
  .ui.label {
    text-decoration: none;
  }
`

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

const options = [{ key: 1, text: 'History', value: 'History' }]

const renderLabel = (label) => ({
  color: 'orange',
  content: label.text,
})

export default () => {
  const [type, setType] = useState(QUESTIONTYPE.OBJECTIVE)
  const [categories, setCategories] = useState([])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      choices: [
        { label: '', isCorrectAnswer: false },
        { label: '', isCorrectAnswer: false },
        { label: '', isCorrectAnswer: false },
        { label: '', isCorrectAnswer: false },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  })

  const setIsCorrectAnswerToTrue = (index) => {
    setValue(
      `choices`,
      fields.map((field, i) => {
        if (index === i) {
          field.isCorrectAnswer = true
        }
      })
    )
  }

  const setIsCorrectAnswerToFalse = (index) => {
    setValue(
      `choices`,
      fields.map((field, i) => {
        if (index === i) {
          field.isCorrectAnswer = false
        }
      })
    )
  }

  const handleChoiceRemove = (index) => {
    const choices = getValues().choices
    if (choices.length - 1 < 2) {
      return alert('จำนวนช้อยส์ต้องมากกว่า 2 จำนวนขึ้นไป')
    }
    remove(index)
  }

  const onSubmit = (data) => {
    data.categories = categories
    data.type = type
    data.choices.map(
      (choice, index) =>
        (choice.isCorrectAnswer = fields[index].isCorrectAnswer)
    )

    questionService
      .createQuestion(data)
      .then(() => alert('สร้างคำถามสำเร็จ'))
      .catch((e) => {
        alert('สร้างคำถามไม่สำเร็จ')
        console.log('error', e)
      })
  }
  console.log('value', getValues())
  return (
    <React.Fragment>
      <h1>สร้างคำถาม</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <Form.Field required>
            <label>คำถาม</label>
            <input
              placeholder=''
              name='name'
              ref={register({ required: true })}
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

          {type === QUESTIONTYPE.OBJECTIVE &&
            fields.map((choice, index) => (
              <ObjectiveChoiceInput
                key={choice.id}
                index={index}
                choice={choice}
                register={register}
                handleChoiceRemove={handleChoiceRemove}
                setIsCorrectAnswerToTrue={setIsCorrectAnswerToTrue}
                setIsCorrectAnswerToFalse={setIsCorrectAnswerToFalse}
              />
            ))}
          {type === QUESTIONTYPE.OBJECTIVE && (
            <Button
              icon='plus'
              size='tiny'
              className='mb-2'
              onClick={() => append({ label: '', isCorrectAnswer: false })}
            />
          )}
          <Dropdown
            multiple
            selection
            name='categories'
            fluid
            options={options}
            placeholder='เลือกประเภทของคำถาม'
            renderLabel={renderLabel}
            onChange={(_, { value }) => setCategories(value)}
          />
          <Button type='submit' color='orange' className='mt-3'>
            สร้างคำถาม
          </Button>
        </Segment>
      </Form>
    </React.Fragment>
  )
}
