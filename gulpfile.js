'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers with autoprefixer
gulp.task('sass', function() {
    return gulp
      .src(['src/scss/**/*.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
          overrideBrowserslist: [
            "> 1%",
    "last 2 versions",
    "ie >= 10"
          ]
        }))
      .pipe(sourcemaps.write('../css'))
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

// Static Server
gulp.task('serve', function(done) {
    browserSync.init({
        server: "./src"
    });
    done();
});

// watching scss/template files
gulp.task('watch', function(done) {
  gulp.watch(['src/scss/**/*.scss'], gulp.series('sass'));
  gulp.watch("src/*.html").on('change', browserSync.reload);
done();
});


// default task
gulp.task('default', gulp.series(gulp.parallel('sass'), gulp.parallel('serve', 'watch')));