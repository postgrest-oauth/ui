import { createMuiTheme } from '@material-ui/core/styles'

export const env = {
  primary: process.env.REACT_APP_PRIMARY_COLOR || '#3f51b5',
  secondary: process.env.REACT_APP_SECONDARY_COLOR || '#f50057',
  error: process.env.REACT_APP_ERROR_COLOR || '#f44336',
  type: process.env.REACT_APP_USE_DARK ? 'dark' : 'light',
  fontSize: process.env.REACT_APP_FONT_SIZE || 14,
  systemFont: process.env.REACT_APP_USE_SYSTEM_FONT
    ? [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',')
    : "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
}

export const theme = createMuiTheme({
  palette: {
    type: env.type,
    primary: { main: env.primary },
    secondary: { main: env.secondary },
    error: { main: env.error },
  },
  typography: {
    fontSize: env.fontSize,
    fontFamily: env.systemFont,
  },
})
