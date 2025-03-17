const gulp = require ('gulp')
const sass = require('gulp-sass')(require('sass'))
const imageMin = require('gulp-imagemin')
const uglify = require('gulp-uglify')

function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

function compilaSass() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'))
}

function minificaImages() {
    return gulp.src('./src/images/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./dist/images'))
}

exports.watch = function() {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false },gulp.parallel(compilaSass))
    gulp.watch('./src/scripts/*.js', { ignoreInitial: false }, gulp.parallel(scripts))
    gulp.watch('./src/images/*', { ignoreInitial: false }, gulp.parallel(minificaImages))
}

exports.default = gulp.parallel(compilaSass, minificaImages, scripts)