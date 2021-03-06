
'use strict'

const paths = {}

paths.css = 'dist/css/'
paths.toMin = ['dist/css/*.css', '!dist/css/*.min.css']
paths.sass = 'scss/**/*.scss'
paths.js = 'dist/js/'
paths.jsInit = 'js/src/init/**/*.js'
paths.jsPopup = 'js/src/popup/**/*.js'
paths.jsMembers = 'js/src/members/**/*.js'
paths.jsAll = 'js/src/**/*.js'
paths.tests = 'js/tests/'

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    qunit = require('node-qunit-phantomjs'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    uglifyEs = require('gulp-uglify-es').default

/**
 * Concatenate javascript files
 */
gulp.task('concatInit', () => gulp.src(paths.jsInit)
    .pipe(concat('stc-popup-init.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('stc-popup-init.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.js)))

gulp.task('concatPopup', () => gulp.src(paths.jsPopup)
    .pipe(concat('stc-popup.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('stc-popup.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.js)))

/**
 * Uglify member i18n files
 */
gulp.task('uglifyMembers', () => gulp.src(paths.jsMembers)
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.js}members/`)))

/**
 * Uglify module files
 */
gulp.task('uglifyModules', () => gulp.src('js/src/modules/**/*.js')
    .pipe(uglifyEs())
    .pipe(gulp.dest('dist/js/modules')))

/**
 * eslint task for all javascript files
 */
gulp.task('eslint', () => gulp.src(paths.jsAll)
    .pipe(eslint({
        configFile: '.eslintrc.json',
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()))

/**
 * Compile SASS to CSS
 */
gulp.task('sass', () => gulp.src('scss/stc-popup.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.css)))

/**
 * Watch SASS files
 */
gulp.task('sass:watch', () => gulp.watch(paths.sass, gulp.series('sass', 'cssmin')))

/**
 * Watch JS files
 */
gulp.task('scripts:watch', () => gulp.watch(paths.jsAll, gulp.series('concatInit', 'concatPopup', 'uglifyMembers', 'uglifyModules')))

/**
 * Minify css files
 */
gulp.task('cssmin', () => gulp.src(paths.toMin)
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.css)))

/**
 * QUnit tests
 */
gulp.task('test', (callback) => qunit(`${paths.tests}index.html`, {verbose: true}, (result) => {
    // Called with 0 for successful test completion, 1 for failure(s).
    if (result === 0) {
        callback()
    } else {
        callback(new Error('tests failed'))
    }
}))

/**
 * Build scripts
 */
gulp.task('build', gulp.series('concatInit', 'concatPopup', 'sass', 'cssmin', 'eslint', 'test', 'uglifyMembers'))

gulp.task('default', gulp.series('build'))
