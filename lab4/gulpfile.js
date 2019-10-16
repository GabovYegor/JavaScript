const gulp = require('gulp')
const flowRemoveTypes = require('gulp-flow-remove-types')
const del = require("del");
const less = require('gulp-less');
var concat = require('gulp-concat-css');

gulp.task('flow', function() {
    return gulp.src('public/clientJS/*.js')
        .pipe(flowRemoveTypes())
        .pipe(gulp.dest('public/productionClientJS'));
})

gulp.task('watchStyle', function(){
    gulp.watch('public/styles/*.less', gulp.series('style'));
});

gulp.task('watchFlow', function(){
    gulp.watch('public/clientJS/*.js', gulp.series('flow'));
});

gulp.task('style', function () {
    del('public/stylesProduction/')
    return gulp.src('public/styles/*.less')
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('public/stylesProduction/'))
})

gulp.task('watch', gulp.series('watchStyle', 'watchFlow'))
gulp.task('default', gulp.series('style', 'flow'))
