import React, { useCallback, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Radio } from 'antd'
import styled from '@emotion/styled'
import { color } from '../constants'
import * as questionService from '../services/question'
import CreateCategory from '../components/Manage/CreateCategory'
import ObjectiveChoiceInput from '../components/ObjectiveChoiceInput'
import { toast } from '../libs/toast'

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

export default () => {
  const [type, setType] = useState(QUESTIONTYPE.OBJECTIVE)
  const [categories, setCategories] = useState([])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    errors,
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

  const { fields, append, remove: removeChoice } = useFieldArray({
    control,
    name: 'choices',
  })

  const setIsCorrectAnswerTo = (value, selectedIndex) => {
    setValue(
      `choices`,
      fields.map((field, index) => {
        if (selectedIndex === index) {
          field.isCorrectAnswer = value
        }
      })
    )
  }

  const handleCategoriesChange = useCallback(
    (categories) => {
      setCategories(categories)
    },
    [setCategories]
  )

  const handleChoiceRemove = (index) => {
    const choices = getValues().choices
    if (choices.length - 1 < 2) {
      return alert('จำนวนช้อยส์ต้องมากกว่า 2 จำนวนขึ้นไป')
    }
    removeChoice(index)
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
      .then(() => {
        toast.success('สร้างคำถามสำเร็จ')
        reset()
      })
      .catch((error) => {
        toast.error('สร้างคำถามไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
        console.error('===Create Question Error===', error)
        throw error
      })
  }

  return (
    <React.Fragment>
      <h1>สร้างคำถาม</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          <Controller
            control={control}
            name='name'
            rules={{ required: true, minLength: 5 }}
            as={
              <Form.Input
                error={
                  errors.name &&
                  errors.name.type === 'minLength' &&
                  'คำถามจำเป็นต้องมีจำนวนตัวอักษรจำนวน 5 ตัวอักษรขึ้นไป'
                }
                label='คำถาม'
              />
            }
          />
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
                setIsCorrectAnswerTo={setIsCorrectAnswerTo}
              />
            ))}
          {type === QUESTIONTYPE.OBJECTIVE && (
            <Button
              icon='plus'
              type='button'
              size='tiny'
              type='button'
              className='mb-2'
              onClick={() => append({ label: '', isCorrectAnswer: false })}
            />
          )}
          <CreateCategory
            title={'ประเภทของคำถาม'}
            onCategoriesChange={handleCategoriesChange}
          />
          <Button type='submit' color='orange' className='mt-3'>
            สร้างคำถาม
          </Button>
        </Segment>
      </Form>
    </React.Fragment>
  )
}
