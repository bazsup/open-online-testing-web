import React, { useState } from 'react'
import { Button, Icon, Label, Popup, Segment } from 'semantic-ui-react'
import { useCallback } from 'react'
import { CategoryList } from '../Manage/CategoryList'
import { toast } from '../../libs/toast'
import dayjs from 'dayjs'

const useToggle = (initial = false) => {
  const [active, setActive] = useState(initial)
  const toggleActive = useCallback(() => {
    setActive(!active)
  }, [active])

  return [active, toggleActive]
}

export default ({ id, name, description, categories, endAt }) => {
  const [active, toggleActive] = useToggle(false)
  const examLink = `${process.env.REACT_APP_BASE_APP_URL}/exam/${id}`
  const now = dayjs()
  const examAlreadyEnd = dayjs(endAt) < now

  const onCopyURLClick = () => {
    navigator.clipboard.writeText(examLink)
    toast.success(`Copied exam link: ${examLink}`)
  }

  return (
    <Segment
      active={active}
      className="d-flex justify-content-between align-items-start"
      onClick={toggleActive}
    >
      <div>
        {examAlreadyEnd && (
          <Label className="mb-2" color="red">
            ข้อสอบหมดเวลาทำแล้ว
          </Label>
        )}

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
              <Button icon disabled={examAlreadyEnd} onClick={onCopyURLClick}>
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
    </Segment>
  )
}
