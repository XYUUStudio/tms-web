var gulp = require('gulp');
var config = require('../config').images;
var imagemin = require('gulp-imagemin');//压缩图片
var cache = require('gulp-cache');//图片缓存，只有图片替换了才压缩

gulp.task('Images', function(){
	return gulp.src(config.src)
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest(config.dist))
});

