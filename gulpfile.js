/**
 * Created by toby on 5/7/16.
 */

var gulp = require('gulp');
var gulpLess = require('gulp-less')
var notify = require('gulp-notify')
var minifyCss = require('gulp-minify-css')//压缩css

var log = function (msg) {
    console.log(msg)
}
//less编译
gulp.task('watch', function () {
    return gulp.watch(['assets/css/**/*.less'], function (event) {
        return gulp
            .src(['assets/css/[^(_)]**/[^(_)]*.less'], {
                base: './assets'
            })
            .pipe(gulpLess())
            .pipe(minifyCss())
            .pipe(gulp.dest('./public'))
            .pipe(notify({ message: 'path->'+event.path }))
            .pipe(notify({ message: 'Less task complete' }));
    });
});