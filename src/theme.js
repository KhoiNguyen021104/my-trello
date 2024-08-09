import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

const APP_BAR_HEIGHT = '48px'
const BOARD_BAR_HEIGHT = '56px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const WIDTH_COLUMN = '272px'
const WIDTH_CARD = '245px'


const theme = extendTheme({
  app: {
    APP_BAR_HEIGHT: APP_BAR_HEIGHT,
    BOARD_BAR_HEIGHT: BOARD_BAR_HEIGHT,
    BOARD_CONTENT_HEIGHT: BOARD_CONTENT_HEIGHT,
    COLUMN_HEADER_HEIGHT: COLUMN_HEADER_HEIGHT,
    COLUMN_FOOTER_HEIGHT: COLUMN_FOOTER_HEIGHT,
    WIDTH_CARD: WIDTH_CARD,
    WIDTH_COLUMN: WIDTH_COLUMN
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
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          textTransform: 'none',
          color: 'white',
          borderWidth: '0.5px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.contrastText,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.contrastText,
          //   borderWidth: 1
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.contrastText
          //   }
          // },
          '& fieldset': {
            borderWidth: '0.5px !important'
          },
          '&:hover fieldset': {
            borderWidth: '2px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px !important'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root:{ fontSize: '0.875rem' }
      }
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: '0.875rem'
        },
        h6: {
          fontSize: '1rem',
          fontWeight: 'bold'
        }
      }
    }
  }
})
export default theme
