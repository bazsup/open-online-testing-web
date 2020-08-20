import React from 'react'
import { Button } from 'semantic-ui-react'

export const PrimaryButton = ({ children, ...props }) => (
  <Button color="orange" {...props}>
    {children}
  </Button>
)
