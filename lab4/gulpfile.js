const gulp = require('gulp')
const flowRemoveTypes = require('gulp-flow-remove-types')
const del = require("del");
const watch = require('gulp-watch');

gulp.task('removeFlow', function () {
    return del('lib')
})

gulp.task('flow', function() {
    return gulp.src('flow.js')
        .pipe(flowRemoveTypes())
        .pipe(gulp.dest('productionCode'));
})

gulp.task('watchJS', function(){
    gulp.watch('flow.js', gulp.series('default'));
});

gulp.task('default', gulp.series('removeFlow', 'flow'))

// gulp.watch('flow.js', function () {
//     console.log('seen')
// })