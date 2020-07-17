import React, { useState } from 'react'
import { Accordion, List, Icon, Button, Label } from 'semantic-ui-react'

export default ({ name, type, choices = null, categories }) => {
  const [active, setActive] = useState(false)
  return (
    <React.Fragment>
      <Accordion.Title
        active={active}
        className='d-flex justify-content-between align-items-center'
        onClick={() => setActive(!active)}
      >
        <div>
          {type === 'OBJECTIVE' && <Icon name='dropdown' />}
          {name}
          {categories.length > 0 && (
            <div className='ml-2 mt-1'>
              {categories.map(({ label, backgroundColor, color }, index) => (
                <Label index={index} tag>
                  {label}
                </Label>
              ))}
            </div>
          )}
        </div>
        <div>
          <Button icon>
            <Icon name='edit' />
          </Button>
          <Button icon>
            <Icon name='trash' />
          </Button>
        </div>
      </Accordion.Title>
      {type === 'OBJECTIVE' && (
        <Accordion.Content active={active}>
          <List>
            {choices.map((choice) => (
              <List.Item>{choice.label}</List.Item>
            ))}
          </List>
        </Accordion.Content>
      )}
    </React.Fragment>
  )
}
