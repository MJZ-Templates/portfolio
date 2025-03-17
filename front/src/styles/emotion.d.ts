import '@emotion/react'
import { Theme } from './theme/colors'

declare module '@emotion/react' {
  export interface Theme extends Theme {}
}