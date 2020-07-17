import React from 'react'
import { Label } from 'semantic-ui-react'

export const CategoryList = ({ categories }) => {
  if (categories.length === 0) return null

  return (
    <div className='ml-2 mt-1'>
      {categories.map(({ label, backgroundColor, color }, index) => (
        <Label index={index} tag>
          {label}
        </Label>
      ))}
    </div>
  )
}
