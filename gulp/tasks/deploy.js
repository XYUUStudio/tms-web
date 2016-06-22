/**
 * Created by xuezhiyu on 16/6/17.
 */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('deploy-dev',function (cb) {
    gulpSequence('clean', ['scripts-dev', 'styles', 'images'], 'views',cb);
})

gulp.task('deploy-test',function (cb) {
    gulpSequence('clean', ['scripts-test', 'styles', 'images'], 'views',cb);
})

gulp.task('deploy-production',function (cb) {
    gulpSequence('clean', ['scripts-production', 'styles', 'images'], 'views',cb);
})