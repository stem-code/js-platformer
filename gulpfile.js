var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('build', function() {

    var tsc = exec('tsc',
        function(error, stdout, stderr) {
            // console.log('stdout: ' + stdout);
            // console.log('stderr: ' + stderr);
            // if (error !== null) {
            //     console.log('exec error: ' + error);
            // }

            var uglify = exec('npm run uglify',
                function(error, stdout, stderr) {
                    // console.log('stdout: ' + stdout);
                    // console.log('stderr: ' + stderr);
                    // if (error !== null) {
                    //     console.log('exec error: ' + error);
                    // }
                }
            )
        }
    )
});