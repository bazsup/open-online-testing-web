import React from 'react'
import styled from '@emotion/styled'
import { color } from '../../constants'
import { Link } from 'react-router-dom'

const Button = styled.button`
  background-color: ${color.orange};
  color: white;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  padding: 7px 9px;

  &:focus {
    outline: none;
  }
`
const NavItem = styled(Link)`
  margin: 0 10px;
  padding: 5px 0;
  color: ${color.darkGrey};
  font-weight: 600;
  text-decoration: none;
`

export default () => (
  <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>
        ดีป้าล่ะ
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navMenu'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navMenu'>
        <div className='navbar-nav ml-auto flex align-items-center'>
          <NavItem to='/'>แดชบอร์ด</NavItem>
          <NavItem href='#'>รีพอร์ท</NavItem>
          <NavItem to='/login'>เข้าสู่ระบบ</NavItem>
          <NavItem to='/manage'>
            <Button>สร้างชุดคำถาม</Button>
          </NavItem>
        </div>
      </div>
    </div>
  </nav>
)
