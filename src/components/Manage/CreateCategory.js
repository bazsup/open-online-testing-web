import React, { useState } from "react"
import styled from "@emotion/styled"
import { darken } from "../../tools/colorConverter"
import { Form } from "semantic-ui-react"
import { useCallback } from "react"

const Box = styled.div`
  border-radius: 0.28571429rem;
  min-height: 2.71428571em;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid rgba(34, 36, 38, 0.15);

  padding: 0.22619048em 2.1em 0.22619048em 0.35714286em;
`

const LabelItem = styled.a`
  background-color: ${(props) => props.backgroundColor}!important;
  color: white !important;

  font-size: 1em !important;

  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;

  padding: 0.35714286em 0.78571429em !important;
  margin: 0.14285714rem 0.28571429rem 0.14285714rem 0 !important;

  user-select: none;
  display: inline-block;
  vertical-align: top;

  text-decoration: none;

  &:hover {
    background-color: ${(props) => darken(props.backgroundColor)}!important;
  }
  border-radius: 0.28571429rem;
  transition: background 0.1s ease;
  font-weight: 700;
  line-height: 1;
`

const useMultipleState = () => {
  const [multi, setMulti] = useState([])

  const add = useCallback(
    (item) => {
      setMulti([...multi, item])
    },
    [multi, setMulti]
  )
  const remove = useCallback(
    (index) => {
      setMulti(multi.filter((_, itemIndex) => index !== itemIndex))
    },
    [multi, setMulti]
  )

  return [multi, add, remove]
}

const CreateCategory = ({ onCategoriesChange }) => {
  const [categories, addCategory, removeCategory] = useMultipleState([])

  const [label, setLabel] = useState('')
  const [backgroundColor, setBackgroundColor] = useState("#f2711c")
  const handleLabelKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleAddCategory()
      setLabel('')
    }
  }
  const handleAddCategory = () => {
    const category = {
      label,
      backgroundColor,
      color: "#ffffff",
    }
    addCategory(category)
    onCategoriesChange(categories)
  }

   const handleRemoveCategory = (index) => {
    removeCategory(index)
    onCategoriesChange(categories)
   }

  return (
    <div>
      <Form.Field>
        <label htmlFor="name">ชื่อประเภท</label>
        <input
          type="text"
          name="ตั้งชื่อประเภทคำถาม"
          value={label}
          onChange={(event) => {
            setLabel(event.target.value)
          }}
          onKeyPress={handleLabelKeyPress}
        />
      </Form.Field>
      <Box>
        {categories.map((category, index) => (
          <LabelItem className="ui label" backgroundColor="#f2711c" key={index}>
            {category.label}
            <i
              aria-hidden="true"
              className="delete icon"
              onClick={() => handleRemoveCategory(index)}
            ></i>
          </LabelItem>
        ))}
      </Box>
    </div>
  )
}

export default CreateCategory
