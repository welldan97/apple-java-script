import gulp from 'gulp';
import babel from 'gulp-babel';

import { spawn } from 'child_process';

gulp.task('build', () => {
    gulp.src(['src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dest'));
});

gulp.task('test', () => {
    let mocha = spawn('mocha',[
        'test',
        '--compilers',
        'js:babel-core/register',
        '--reporter',
        'spec',
        '--recursive'
    ]);

    mocha.stdout.on('data', function(data) {
        process.stdout.write(data);
    });

    mocha.stderr.on('data', function(data) {
        process.stdout.write(data);
    });
});

gulp.task('default', ['build']);
