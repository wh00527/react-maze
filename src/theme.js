import {createMuiTheme} from 'material-ui/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#d2cb7a',
            main: '#43a047',
            dark: '#637014',
            contrastText: '#000'
        },
        secondary: {
            light: '#ff6f60',
            main: '#e53935',
            dark: '#ab000d',
            contrastText: '#000'
        }
    }
})

export default theme