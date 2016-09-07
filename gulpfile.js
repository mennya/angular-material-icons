'use strict';

const gulp = require('gulp');
const g = require('gulp-load-plugins')();

gulp.task('build', function () {
  return gulp.src(['./src/*.ts'])
    .pipe(g.typescript())
    .pipe(g.concatUtil('app.js'))
    .pipe(g.rename('ny-angular-material-icons.js'))
    .pipe(gulp.dest('dist'))
    .pipe(g.uglify())
    .pipe(g.rename('ny-angular-material-icons.min.js'))
    .pipe(gulp.dest('dist'));
});

module.exports = gulp;
