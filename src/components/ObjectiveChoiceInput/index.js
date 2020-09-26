import React from 'react'
import { Form, Input, Label, Button, Icon } from 'semantic-ui-react'

export default ({
  index,
  choice,
  register,
  handleChoiceRemove,
  setIsCorrectAnswerTo,
}) => {
  return (
    <div className="d-flex my-3">
      <Form.Field className="flex-grow-1 m-0">
        <Input labelPosition="left" type="text">
          <Label basic color={choice.isCorrectAnswer && 'teal'}>
            {index + 1}
          </Label>
          <input
            name={`choices[${index}].label`}
            defaultValue={choice.label}
            required
            ref={register()}
          />
        </Input>
      </Form.Field>

      <Button.Group className="px-2">
        <Button
          type="button"
          icon
          onClick={() => setIsCorrectAnswerTo(false, index)}
        >
          <Icon name="times" />
        </Button>
        <Button
          type="button"
          icon
          onClick={() => setIsCorrectAnswerTo(true, index)}
        >
          <Icon name="check" />
        </Button>
      </Button.Group>
      <Button
        type="button"
        icon="trash"
        onClick={() => handleChoiceRemove(index)}
      />
    </div>
  )
}
