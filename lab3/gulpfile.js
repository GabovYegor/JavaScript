'use strict'

const gulp = require('gulp')
const less = require('gulp-less');
const babel = require("gulp-babel");
const pug = require('gulp-pug');
const del = require("del");

gulp.task('delStyle', function(){
    return del('./public/styleProduction/*.css');
})

gulp.task('style', function () {
    return gulp.src('public/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/stylesProduction/'))
})

gulp.task('updateStyle', gulp.series('delStyle', 'style'))

gulp.task('delJS', function(){
    return del('./public/JQueryCodeProduction/*.js');
})

gulp.task('js', function(){
    return gulp.src('./public/JQueryCode/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./public/JQueryCodeProduction/'))
});

gulp.task('updateJS', gulp.series('delJS', 'js'))

gulp.task('views', function () {
    return gulp.src('views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('viewsProduction'))
})

gulp.task('default', gulp.parallel('updateStyle', 'updateJS'));