import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { brown, deepOrange, orange, teal } from '@mui/material/colors'


const appBarHeight = '48px'
const boardBarHeight = '58px'

const theme = extendTheme({
  app: {
    appBarHeight: appBarHeight,
    boardBarHeight: boardBarHeight,
    contentHeight: `calc(100vh - ${appBarHeight} - ${boardBarHeight})`
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: brown,
        secondary: orange
      }
    }
  }
})
export default theme
