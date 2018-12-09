import React from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'
import Drawing from './Drawing'

class Solution extends React.Component {

    render() {
        const {classes, solution} = this.props;
        return (
            <React.Fragment>
                <Grid container justify='center'>
                    <Grid item className={classes.maxWidth}>
                        <Drawing solution={solution}/>
                    </Grid>
                    <Grid container justify='center' className={classes.paddingB}>
                        <Grid item>
                            <Button variant='raised' color='secondary' onClick={this.props.handleBack}>Back</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

const styles = () => ({
    paddingB: {
        paddingBottom: 16
    },
    maxWidth: {
        maxWidth: '100%',
        paddingBottom: 16
    }
})

export default withStyles(styles)(Solution)