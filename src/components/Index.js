import React from 'react'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
import Solution from './Solution'
import MazeInput from './MazeInput'
import solver from '../Model/maze'

class Index extends React.Component {

    state = {}

    handleBack = () => {
        this.setState({showSolution: false})
    }

    async handleSolve(mazeText) {
        try {            
            const mazeObj = new solver();
            const response = mazeObj.getSolution(mazeText);            
            //console.log(response);
            this.setState({
                showSolution: true,
                mazeSolution: response || {}
            })
        }
        catch (error) {
            console.log(error)            
        }
    }

    render() {
        const {classes} = this.props
        const {showSolution, mazeSolution} = this.state
        const display = showSolution ?
            <Solution handleBack={this.handleBack} solution={mazeSolution}/> :
            <MazeInput handleSolve={this.handleSolve.bind(this)}/>

        return (
            <React.Fragment>
                <Grid container className={classes.padding}>
                    <Grid item xs={12}>
                        <Typography variant='display3' align='center'>Maze Solver</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {display}
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

const styles = () => ({
    center: {
        textAlign: 'center'
    },
    paddingB: {
        paddingBottom: 16
    },
    padding: {
        padding: 16
    }
})

export default withStyles(styles)(Index)