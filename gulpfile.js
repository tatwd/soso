/**
 * ----
 * ES5 Grammar
 * ----
 */

'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    plumber     = require('gulp-plumber');

var reload = browserSync.reload;

// directories objects

var dir = {
    _sass: {
        _main: 'scss/soso.scss',
        _src : 'scss/**/*.scss',
        _dist: 'dist/css'
    },
    _js: {
        _src : 'js/src/*.js',
        _swap: 'js/dist',
        _test: 'js/tests/*.js',
        _dist: 'dist/js',
    },
    _html: {
        _src: './**/*.html'
    }
}


/**
 * ----
 * Tasks Definition
 * ----
 */

// serve task
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'demo.html'
        }
    });
});

// sass task
gulp.task('sass', function () {
    return gulp.src(dir._sass._main)
        .pipe(plumber())
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(dir._sass._dist))
        .pipe(browserSync.stream());
});

// uglify task
gulp.task('uglify', function () {
    gulp.src(dir._js._test)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(dir._js._swap))
        .pipe(browserSync.stream());
});

// watch task
gulp.task('watch', function () {
    gulp.watch(dir._sass._src, ['sass']);
    gulp.watch(dir._js._test, ['uglify']);
    gulp.watch(dir._html._src).on('change', reload);
});

// default task
gulp.task('default', ['sass', 'uglify', 'serve', 'watch']);

// travis task
gulp.task('travis', ['default'], function() {
    console.log('Run gulp successfully!');
    process.exit(0);
});