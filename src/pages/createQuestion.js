import React, { useState } from 'react'
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

const createArray = (length) => {
  return Array.from({ length }, (_, k) => k + 1)
}

const getChoiceField = (choiceAmount, register) => {
  return createArray(choiceAmount).map((choiceNumber, index) => (
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

const options = [{ key: 1, text: 'History', value: 'History' }]

const renderLabel = (label) => ({
  color: 'orange',
  content: label.text,
})

export default () => {
  const { register, handleSubmit } = useForm()
  const [choiceAmount, setChoiceAmount] = useState(4)
  const [type, setType] = useState(QUESTIONTYPE.OBJECTIVE)
  const [categories, setCategories] = useState([])
  const [correctChoices, setCorrectChoices] = useState([
    false,
    false,
    false,
    false,
  ])

  const handleOnCheckboxChange = (_, { value }) => {
    correctChoices[value - 1] = !correctChoices[value - 1]
    setCorrectChoices(correctChoices)
  }

  const handleChoiceAmountChange = (action) => {
    if (action === 'minus' && choiceAmount - 1 >= 2) {
      setChoiceAmount(choiceAmount - 1)
      setCorrectChoices(correctChoices.splice(0, choiceAmount - 1))
    }
    if (action === 'plus') {
      setChoiceAmount(choiceAmount + 1)
      setCorrectChoices(correctChoices.concat([false]))
    }
  }

  const onSubmit = (data) => {
    if (type === QUESTIONTYPE.OBJECTIVE) {
      data.choices.forEach((choice, index) => {
        choice.isCorrectAnswer = correctChoices[index]
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
            getChoiceField(choiceAmount, register)}
          {type === QUESTIONTYPE.OBJECTIVE && (
            <Button.Group size='mini' className='mb-2'>
              <Button
                icon='plus'
                onClick={() => handleChoiceAmountChange('plus')}
              />
              <Button
                icon='minus'
                onClick={() => handleChoiceAmountChange('minus')}
              />
            </Button.Group>
          )}
          {type === QUESTIONTYPE.OBJECTIVE && (
            <Form.Group inline>
              <label>ชอยซ์ทีถูก</label>
              {correctChoices.map((_, index) => (
                <Form.Field
                  control={Checkbox}
                  label={`${index + 1}`}
                  value={index + 1}
                  onChange={handleOnCheckboxChange}
                />
              ))}
            </Form.Group>
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
          <Button color='orange' className='mt-3'>
            สร้างคำถาม
          </Button>
        </Segment>
      </Form>
    </React.Fragment>
  )
}
