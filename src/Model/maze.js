module.exports = class Maze{    
    constructor() {
        //this.items = items
        //this.cache = {}
        this.legend = {
            wall: '#',
            path: ' ',
            startPoint: 'S',
            endPoint: 'F',
            traveledPath: '@'
        };
    }

    //generate map from start point, end point
    getMap(data) {

        const lines = data.split('\n');
        let map = {};
        let totalSize = 0;
        for (var y = 0; y < lines.length; y++) {
            //filter invliad characters
            let line = lines[y].replace(new RegExp('[^' + '\\' + this.legend.wall + '\\' + this.legend.path + '\\' + this.legend.startPoint + '\\' + this.legend.endPoint + '\\s]'), '');
            totalSize += line.length;

            //discover the start and end points
            for (var x = 0; x < line.length; x++) {
                if (line[x] === this.legend.startPoint) {
                    map.startPoint = {
                        x: x,
                        y: y
                    };
                } else if (line[x] === this.legend.endPoint) {
                    map.endPoint = {
                        x: x,
                        y: y
                    };
                }
            }
        }
        map.maze = lines;
        map.totalSize = totalSize;

        if (map.startPoint && map.endPoint) {
            return map;
        }
        throw Error('Maze must have a start point (' + this.legend.startPoint + ') and end point (' + this.legend.endPoint + ')');
    }

    //get point from history array
    getPointFromHistory(history, point) {
        let xy = point.x + ',' + point.y;
        return history[xy];
    }

    //set point in history array
    setPointInHistory(history, point) {
        let xy = point.x + ',' + point.y;
        point.traveled = 1;
        history[xy] = point;
    }

    //find available moves from the current point, exclude points we've visited this iteration
    findAvailableMoves(maze, excludePoints, currentPoint) {
        let availableMoves = [];
        let trialMoves = [],move,historyPoint;

        //try up
        trialMoves.push({
            x: currentPoint.x,
            y: currentPoint.y - 1
        });

        //try down
        trialMoves.push({
            x: currentPoint.x,
            y: currentPoint.y + 1
        });

        //try right
        trialMoves.push({
            x: currentPoint.x + 1,
            y: currentPoint.y
        });

        //try left
        trialMoves.push({
            x: currentPoint.x - 1,
            y: currentPoint.y
        });

        for (var i = 0; i < trialMoves.length; i++) {

            move = trialMoves[i];
            if (maze[move.y] && maze[move.y][move.x]) {
                historyPoint = this.getPointFromHistory(excludePoints, move);
                if (!historyPoint) {
                    if (maze[move.y][move.x] === this.legend.path || maze[move.y][move.x] === this.legend.endPoint) {
                        availableMoves.push(move);
                    }
                }
            }
        }
        return availableMoves;
    }

    getSolution(data) {

        let map = this.getMap(data),history = [],availableMoves,currentTravels = 0;

        //sort by preferred moves (preferred moves include the least visited points)
        function sortByMostPreferredMoves(moveA, moveB) {
            let pointA = getPointFromHistory(history, moveA);
            let pointB = getPointFromHistory(history, moveB);
            return (pointA ? pointA.traveled : 0) - (pointB ? pointB.traveled : 0);
        }

        function getPointFromHistory(history, point) {
            var xy = point.x + ',' + point.y;
            return history[xy];
        }

        do {
            let currentPoint = map.startPoint,currentPath = {};
            do {
                //keep going until we run out of available moves in this iteration
                if (map.maze[currentPoint.y][currentPoint.x] !== this.legend.endPoint) {
                    this.setPointInHistory(currentPath, currentPoint);                   
                    let point = this.getPointFromHistory(history, currentPoint);

                    if (!point) {
                        this.setPointInHistory(history, currentPoint);
                    } else {
                        currentTravels = ++point.traveled;
                    }
                    //find an available move to make from the current point
                    availableMoves = this.findAvailableMoves(map.maze, currentPath, currentPoint);

                    if (availableMoves.length > 0) {
                        availableMoves.sort(sortByMostPreferredMoves);
                        currentPoint = availableMoves[0];
                    }
                } else {
                    //return the solution
                    return {
                        maze: map.maze,
                        solutionPath: currentPath
                    };
                }
            }
            while (availableMoves && availableMoves.length > 0);
        }
        while (currentTravels < map.totalSize);

        //no solution is available to get to the end point, error out
        throw Error('No solution available!');
    }
};