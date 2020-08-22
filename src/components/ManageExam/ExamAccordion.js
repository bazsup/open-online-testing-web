import React, { useState } from 'react'
import { Accordion, Button, Icon } from 'semantic-ui-react'
import { useCallback } from 'react'
import { CategoryList } from '../Manage/CategoryList'

const useToggle = (initial = false) => {
  const [active, setActive] = useState(initial)
  const toggleActive = useCallback(() => {
    setActive(!active)
  }, [active])

  return [active, toggleActive]
}

export default ({ name, description, questions, categories }) => {
  const [active, toggleActive] = useToggle(false)
  return (
    <React.Fragment>
      <Accordion.Title
        active={active}
        className='d-flex justify-content-between align-items-start'
        onClick={toggleActive}
      >
        <div>
          <div>
            <strong>{name}</strong>
          </div>
          <div>
            {`รายละเอียด: ${description}`}
          </div>

          {categories.length > 0 && <CategoryList categories={categories} />}
        </div>
        <div>
          <Button icon disabled>
            <Icon name='edit' />
          </Button>
        </div>
      </Accordion.Title>
    </React.Fragment>
  )
}
