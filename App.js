import React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import {MuiThemeProvider} from 'material-ui/styles'
import theme from './theme'
import Index from './components/Index'

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline>
                    <MuiThemeProvider theme={theme}>
                        <Index/>
                    </MuiThemeProvider>
                </CssBaseline>
            </React.Fragment>
        )
    }
}

export default App
