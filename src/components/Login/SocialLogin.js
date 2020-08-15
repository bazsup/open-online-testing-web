import React from 'react'
import { Button } from 'semantic-ui-react'

const SocialLogin = () => {
  return (
    <div>
      <div className="my-2">
        <Button fluid basic>Google</Button>
      </div>
      <div className="my-2">
        <Button fluid basic>Facebook</Button>
      </div>
    </div>
  )
}

export default SocialLogin
