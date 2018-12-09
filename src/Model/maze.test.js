import solver from './maze';

/**
 * Describe mazeSolver
 */
describe('mazeSolver', function() {

    
    beforeEach(() => {
        let data = '',solution;error;               
      });

    describe('.getSolution', function() {
        it('should solve a maze with a begin and end point in straight line', function(done) {
            const data = 'S   F';
            const mazeObj = new solver();     
            solution = mazeObj.getSolution(data);
            expect(solution && Object.keys(solution.solutionPath).length > 0);            
        });

        it('should solve test maze in exactly 6 steps', function(done) {
            const data = 'S     F';
            const mazeObj = new solver();     
            solution = mazeObj.getSolution(data);
            expect(solution && Object.keys(solution.solutionPath).length === 6);            
        });

        it('should solve test maze with walls in the way', function(done) {
            const data = '#######\n';
            data += 'S  #  F\n';
            data += '#  ### \n';
            data += '#      \n'
            data += '#######';
            const mazeObj = new solver();     
            solution = mazeObj.getSolution(data);
            assert(solution && Object.keys(solution.solutionPath).length > 0);
            done();
        });

    });
});