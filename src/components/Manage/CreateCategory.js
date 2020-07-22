import React, { useState, useEffect } from "react"
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

  &.category-input {
    padding-top: 3px !important;
    padding-bottom: 3px !important;
  }
`

const ColorTag = styled.a`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 1px solid gray;
`

const ColorGroup = styled.div`
  position: absolute;
  display: inline-block;
  background: white;
  border-radius: 5px;
  padding: 2px 2px 0px 4px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  top: -40px;
  left: 0;
  width: 98px;
  a {
    margin-right: 4px;
  }
`

const Input = styled.input`
  padding: 0px;
  display: inline !important;
  width: 100px !important;
  margin-left: 3px !important;
  border: none !important;
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

const colors = [
  '#0d6efd',
  '#6610f2',
  '#6f42c1',
  '#d63384',
  '#dc3545',
  '#fd7e14',
  '#ffc107',
  '#28a745',
  '#20c997',
  '#17a2b8'
]

const CreateCategory = ({ title, onCategoriesChange }) => {
  const [categories, addCategory, removeCategory] = useMultipleState([])
  const [showColorPicker, setShowColorPicker] = useState(false)

  const [label, setLabel] = useState('')
  const [backgroundColor, setBackgroundColor] = useState("#f2711c")


  const handleChangeColor = (color) => {
    setBackgroundColor(color)
    toggleColorPicker()
  }

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker)
  }

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
  }

   const handleRemoveCategory = (index) => {
    removeCategory(index)
  }
  
  useEffect(() => {
    onCategoriesChange(categories)
   }, [categories, onCategoriesChange])

  return (
    <div>
      <Form.Field>
        <label>{title}</label>
        {categories.map((category, index) => (
          <LabelItem className="ui label" backgroundColor={category.backgroundColor} key={index}>
            {category.label}
            <i
              aria-hidden="true"
              className="delete icon"
              onClick={() => handleRemoveCategory(index)}
            ></i>
          </LabelItem>
        ))}
        <LabelItem as="div" backgroundColor="#fff" className="category-input">
          <div className='d-inline-block position-relative'>
            <ColorTag color={backgroundColor} onClick={toggleColorPicker} />
            {showColorPicker && (
              <ColorGroup>
                {
                  colors.map(color => (
                    <ColorTag color={color} key={color} onClick={() => handleChangeColor(color)} />
                  ))
                }
              </ColorGroup>
            )}
          </div>
          <Input
            type="text"
            placeholder="ชื่อประเภท"
            style={{ padding: 0 }}
            value={label}
            onChange={(event) => {
              setLabel(event.target.value)
            }}
            onKeyPress={handleLabelKeyPress}
          />
        </LabelItem>
      </Form.Field>
    </div>
  )
}

export default CreateCategory
