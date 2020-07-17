import { color } from '../constants'
import styled from '@emotion/styled'
import {
  Button as UnstyleButton
} from 'semantic-ui-react'

export const CallToActionButton = styled(UnstyleButton)`
  background-color: ${color.purple} !important;
  color: white !important;
`
