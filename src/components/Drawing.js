import React from 'react'
import Paper from 'material-ui/Paper'

export default class Drawing extends React.Component {

    generateMaze = (solution) => {
        let finalPath = '';
        for (var i in solution.maze) {
                let str = '';
                str += '<p style="margin:0 auto">'
                for (var j  in solution.maze[i] ) {
                    let mazeCh = solution.maze[i][j];
                    if (mazeCh !== 'S' && solution.solutionPath[j + ',' + i]) {
                        str += '<span style="height:15px;width:15px;background-color:blue;color:white;display:inline-block">@</span>';
                    } else {
                        if (mazeCh == '#') {
                            str += '<span style="height:15px;width:15px;background-color:black;color:white;display:inline-block">'+mazeCh+'</span>';
                        } else if (mazeCh == ' ') {
                            str += '<span <span style="height:15px;width:15px;background-color:black;color:white;display:inline-block">'+mazeCh+'</span>';
                        } else if (mazeCh === 'S' || mazeCh === 'F') {
                            str += '<span <span style="height:15px;width:15px;background-color:red;display:inline-block">'+mazeCh+'</span>';
                        } else {
                            str += mazeCh;
                        }
                    }
                }
                str += '</p>'
                finalPath += str;
        }
        return finalPath;
    }

    render() {
        const {solution} = this.props;
        let maze = this.generateMaze(solution);
        return (
            <Paper elevation={8} square>
                <div dangerouslySetInnerHTML={{ __html: maze }} />
            </Paper>
        )
    }
}