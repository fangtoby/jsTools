/**
 * Created by toby on 5/7/16.
 */

var gulp = require('gulp');
var gulpLess = require('gulp-less')
var notify = require('gulp-notify')
var minifyCss = require('gulp-minify-css')//压缩css
var browserSync = require('browser-sync').create()

var autoprefix = require('gulp-autoprefixer');

var reload   = browserSync.reload;

var log = function (msg) {
    console.log(msg)
}
// Domain server

gulp.task('default',['watch'])

gulp.task('browser-sync', function() {
   browserSync.init({
       proxy: "www.yiban.dev"
       //server: "./"
   });
});

//less编译
gulp.task('watch',['browser-sync'], function () {

    gulp.watch(['assets/css/**/*.less'], function (event) {
        return gulp
            .src(['assets/css/[^(_)]**/[^(_)]*.less'], {
                base: './assets'
            })
            .pipe(gulpLess())
            .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
            .pipe(minifyCss())
            .pipe(gulp.dest('./public'))
            .pipe(notify({ message: 'path->'+event.path }))
            .pipe(notify({ message: 'Less task complete' }))
            .pipe(reload({stream: true}));
    });
});