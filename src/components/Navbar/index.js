import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { Link, useHistory } from 'react-router-dom'
import { Button as ReactButton, Dropdown, Icon } from 'semantic-ui-react'

import { color, lang } from '../../constants'
import { useContext } from 'react'
import { UserContext } from '../../context/user-context'

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

export default ({ isAuthenticated, setIsAuthenticated }) => {
  const userContext = useContext(UserContext)

  const history = useHistory()
  const logout = useCallback(() => {
    setIsAuthenticated(false)
    localStorage.clear()
    history.push('/')
  }, [history, setIsAuthenticated])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ดีป้าล่ะ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <div className="navbar-nav ml-auto flex align-items-center">
            {isAuthenticated ? (
              <React.Fragment>
                <NavItem to="/manage">
                  <Button>สร้างชุดข้อสอบ</Button>
                </NavItem>
                <Dropdown
                  trigger={
                    <ReactButton circular basic>
                      <Icon name="user" /> {userContext.user.name}
                    </ReactButton>
                  }
                  icon={null}
                  pointing="top right"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item text={lang.th.logout} onClick={logout} />
                  </Dropdown.Menu>
                </Dropdown>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem to="/login">{lang.th.login}</NavItem>
                <NavItem to="/register">
                  <Button>{lang.th.register}</Button>
                </NavItem>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
