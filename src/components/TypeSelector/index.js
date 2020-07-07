import React from 'react'
import styled from '@emotion/styled'
import { color } from '../../constants'

const TypeSelector = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  background-color: ${(props) => props.active && color.orange};
  color: ${(props) => (props.active ? 'white' : color.darkGrey)};
  border-radius: 4px;
  border: 2px solid ${color.orange};
  height: 120px;
  margin: 0 20px 10px 20px;
  width: 300px;

  .icon {
    max-width: 40px;
    margin: 0 15px 10px 15px;
    color: ${(props) => (props.active ? 'white' : color.purple)};
  }
`

export default ({ img, label, active = false }) => (
  <TypeSelector active={active}>
    <img src={img} className='icon' alt='wow' />
    {label}
  </TypeSelector>
)
