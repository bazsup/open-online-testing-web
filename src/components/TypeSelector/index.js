import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { color } from '../../constants'

const TypeSelector = styled(NavLink)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  color: ${color.darkGrey};
  border-radius: 4px;
  border: 2px solid ${color.orange};
  height: 120px;
  margin: 0 20px 10px 20px;
  width: 300px;
  text-decoration: none;

  &.is-active {
    background-color: ${color.orange};
    color: white;
    &:hover {
      color: white;
    }
  }
  &:hover {
    color: ${color.darkGrey};
  }
`

const Icon = styled.span`
  font-size: 40px;
  margin-bottom: 5px;
`

const isExactMatch = (match) => {
  if (!match) {
    return false;
  }
  return match.isExact
}

export default ({ to, icon: iconName, label }) => (
  <TypeSelector activeClassName='is-active' isActive={isExactMatch} to={to}>
    <Icon className={`icon-${iconName}`} />
    {label}
  </TypeSelector>
)
