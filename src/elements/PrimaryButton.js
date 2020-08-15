import React from 'react'
import { Button } from 'semantic-ui-react'

export const PrimaryButton = ({ className, children, ...props }) => (
  <Button color="orange" className={className} {...props}>
    {children}
  </Button>
)
