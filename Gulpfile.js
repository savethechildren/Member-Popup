'use strict';

var paths = {};

paths.css = 'dist/css/';
paths.toMin = ['dist/css/*.css', '!dist/css/*.min.css'];
paths.sass = 'scss/**/*.scss';
paths.js = 'dist/js/';
paths.jsInit = 'js/src/init/**/*.js';
paths.jsPopup = 'js/src/popup/**/*.js';
paths.jsMembers = 'js/src/members/**/*.js';
paths.jsAll = 'js/src/**/*.js';
paths.tests = 'js/tests/';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    qunit = require('gulp-qunit'),
    uglify = require('gulp-uglify');

/**
 * Concatenate javascript files
 */
gulp.task('concatInit', function() {
    return gulp.src(paths.jsInit)
        .pipe(concat('stc-popup-init.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(rename('stc-popup-init.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js));
});

gulp.task('concatPopup', function() {
    return gulp.src(paths.jsPopup)
        .pipe(concat('stc-popup.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(rename('stc-popup.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js));
});

/**
 * Uglify member i18n files
 */
gulp.task('uglifyMembers', function() {
    return gulp.src(paths.jsMembers)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js + 'members/'));
});

/**
 * eslint task for all javascript files
 */
gulp.task('eslint', function() {
    return gulp.src(paths.jsAll)
        .pipe(eslint({
            configFile: '.eslintrc.json',
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * Compile SASS to CSS
 */
gulp.task('sass', function() {
    return gulp.src('scss/stc-popup.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css));
});

/**
 * Watch SASS files
 */
gulp.task('sass:watch', function() {
    gulp.watch(paths.sass, ['cssmin']);
});

/**
 * Watch JS files
 */
gulp.task('scripts:watch', function() {
    gulp.watch(paths.jsAll, gulp.series(gulp.parallel('concatInit', 'concatPopup', 'uglifyMembers')));
});

/**
 * Minify css files
 */
gulp.task('cssmin', gulp.series(gulp.parallel('sass')), function() {
    return gulp.src(paths.toMin)
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css));
});

/**
 * QUnit tests
 */
gulp.task('test', function() {
    return gulp.src(paths.tests + 'index.html')
        .pipe(qunit());
});

/**
 * Build scripts
 */
gulp.task('build', gulp.series(gulp.parallel('concatInit', 'concatPopup', 'sass', 'cssmin', 'eslint', 'test', 'uglifyMembers')));

gulp.task('default', gulp.series(gulp.parallel('build')));
