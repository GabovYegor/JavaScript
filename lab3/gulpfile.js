'use strict'

const gulp = require('gulp')
const less = require('gulp-less');
const babel = require("gulp-babel");
const pug = require('gulp-pug');

gulp.task('styles', function () {
    return gulp.src('public/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/styles/'))
})

gulp.task('js', function () {
    return gulp.src('server.js')
        .pipe(babel())
        .pipe(gulp.dest('default'))
})

gulp.task('views', function () {
    return gulp.src('views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('default'))
})

function hello(callback) {
    console.log("Hello")
    callback()
}