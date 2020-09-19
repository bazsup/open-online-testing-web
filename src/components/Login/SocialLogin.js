import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../constants'

const SocialLogin = () => {
  return (
    <div>
      <div className="my-2">
        <Button fluid basic as="a" href={GOOGLE_AUTH_URL}>
          <Image
            avatar
            spaced="right"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png"
            alt="google logo"
          />
          Continue with Google
        </Button>
      </div>
      <div className="my-2">
        <Button fluid basic as="a" href={FACEBOOK_AUTH_URL}>
          <Image
            avatar
            spaced="right"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
            alt="facebook logo"
          />
          Continue with Facebook
        </Button>
      </div>
    </div>
  )
}

export default SocialLogin
