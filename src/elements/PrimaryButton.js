import React from 'react'
import { Button } from "semantic-ui-react";

export const PrimaryButton = ({ className, children }) => (
<Button color='orange' className={className}>{children}</Button>
)
