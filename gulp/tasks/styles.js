
var gulp = require('gulp');
var config = require('../config').styles;
var minifycss = require('gulp-minify-css');//压缩css
var rename = require('gulp-rename')

gulp.task('Styles', function(){
	return gulp.src(config.src)
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
        .pipe(gulp.dest(config.dist));
});