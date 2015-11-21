import gulp from 'gulp';
import babel from 'gulp-babel';
// var gulp = require('gulp');

var spawn = require('child_process').spawn;

gulp.task('build', () => {
    gulp.src(['src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dest'));
});

gulp.task('test', () => {
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
