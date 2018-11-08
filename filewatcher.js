var watch = require('node-watch');
var exec = require('child_process').exec;

var build = false;
watch(__dirname, { recursive: true }, function(evt, name) {
    if (name.split("application").length < 2 && !build){
        build = true;
        console.log("File has changed, building....");

        var comm = exec('gulp build', function(stdout){
            console.log("done.");
            build = false;
        });
    }
});