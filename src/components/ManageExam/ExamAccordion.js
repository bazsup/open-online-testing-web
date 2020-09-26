import React, { useState } from 'react'
import { Accordion, Button, Icon, Popup } from 'semantic-ui-react'
import { useCallback } from 'react'
import { CategoryList } from '../Manage/CategoryList'
import { toast } from '../../libs/toast'

const useToggle = (initial = false) => {
  const [active, setActive] = useState(initial)
  const toggleActive = useCallback(() => {
    setActive(!active)
  }, [active])

  return [active, toggleActive]
}

export default ({ id, name, description, categories }) => {
  const [active, toggleActive] = useToggle(false)
  const examLink = `${process.env.REACT_APP_BASE_APP_URL}/exam/${id}`

  const onCopyURLClick = () => {
    navigator.clipboard.writeText(examLink)
    toast.success(`Copied exam link: ${examLink}`)
  }

  return (
    <React.Fragment>
      <Accordion.Title
        active={active}
        className="d-flex justify-content-between align-items-start"
        onClick={toggleActive}
      >
        <div>
          <div>
            <strong>{name}</strong>
          </div>
          <div>{`รายละเอียด: ${description}`}</div>

          {categories.length > 0 && <CategoryList categories={categories} />}
        </div>
        <div>
          <Button.Group>
            <Popup
              position="top right"
              trigger={
                <Button icon onClick={onCopyURLClick}>
                  <Icon name="copy" />
                </Button>
              }
              content={examLink}
              inverted
            />

            <Button icon disabled>
              <Icon name="edit" />
            </Button>
          </Button.Group>
        </div>
      </Accordion.Title>
    </React.Fragment>
  )
}
