import React from 'react'
import { Form, Input, Label, Button, Icon } from 'semantic-ui-react'

export default ({
  index,
  choice,
  register,
  handleChoiceRemove,
  setIsCorrectAnswerToTrue,
  setIsCorrectAnswerToFalse,
}) => {
  return (
    <div className='d-flex my-3'>
      <Form.Field className='flex-grow-1 m-0'>
        <Input labelPosition='left' type='text'>
          <Label basic color={choice.isCorrectAnswer && 'teal'}>
            {index + 1}
          </Label>
          <input
            name={`choices[${index}].label`}
            defaultValue={choice.label}
            ref={register()}
          />
        </Input>
      </Form.Field>

      <Button.Group className='px-2'>
        <Button
          type='button'
          icon
          onClick={() => setIsCorrectAnswerToFalse(index)}
        >
          <Icon name='times' />
        </Button>
        <Button
          type='button'
          icon
          onClick={() => setIsCorrectAnswerToTrue(index)}
        >
          <Icon name='check' />
        </Button>
      </Button.Group>
      <Button
        type='button'
        icon='trash'
        onClick={() => handleChoiceRemove(index)}
      />
    </div>
  )
}
