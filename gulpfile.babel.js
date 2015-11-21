var gulp = require('gulp');
var babel = require('gulp-babel');

spawn = require('child_process').spawn;

gulp.task('build', function() {
    gulp.src(['src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dest'));
});

gulp.task('test', function() {
    var mocha;
    mocha = spawn('mocha', ['test', '--compilers', 'js:babel-core/register', '--reporter', 'spec', '--recursive']);
    mocha.stdout.on('data', function(data) {
        return process.stdout.write(data);
    });
    return mocha.stderr.on('data', function(data) {
        return process.stdout.write(data);
    });
});

gulp.task('default', ['build']);
