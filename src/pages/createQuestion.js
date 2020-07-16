import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Segment,
  Form,
  Input,
  Label,
  Button,
  Radio as SemanticRadio,
  Dropdown as UnstyledDropdown,
} from 'semantic-ui-react'
import { Radio } from 'antd'
import styled from '@emotion/styled'
import { color } from '../constants'

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

const options = [{ key: 1, text: 'History', value: 'History' }]

const renderLabel = (label) => ({
  color: 'orange',
  content: label.text,
})

export default () => {
  const { register, handleSubmit } = useForm()

  const [type, setType] = useState(QUESTIONTYPE.OBJECTIVE)
  const [categories, setCategories] = useState([])
  const [correctChoice, setCorrectChoice] = useState(1)

  const onSubmit = (data) => {
    if (type === QUESTIONTYPE.OBJECTIVE) {
      data.choices.map((choice, index) => {
        choice.isCorrectAnswer = correctChoice === index + 1
      })
    }
    data.categories = categories
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
              name='questionName'
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
                control={SemanticRadio}
                label='1'
                value={1}
                checked={correctChoice === 1}
                onChange={(_, { value }) => setCorrectChoice(value)}
              />
              <Form.Field
                control={SemanticRadio}
                label='2'
                value={2}
                checked={correctChoice === 2}
                onChange={(_, { value }) => setCorrectChoice(value)}
              />
              <Form.Field
                control={SemanticRadio}
                label='3'
                value={3}
                checked={correctChoice === 3}
                onChange={(_, { value }) => setCorrectChoice(value)}
              />
              <Form.Field
                control={SemanticRadio}
                label='4'
                value={4}
                checked={correctChoice === 4}
                onChange={(_, { value }) => setCorrectChoice(value)}
              />
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
