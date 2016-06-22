var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config').clean;


gulp.task("cleanCss", function(){
	return gulp.src(config.styles)
		.pipe(clean());

});
gulp.task("cleanJs", function(){
	return gulp.src(config.scripts)
		.pipe(clean());

});
gulp.task("cleanImg", function(){
	return gulp.src(config.images)
		.pipe(clean());

});
gulp.task("clean", function(){
	return gulp.src(config.dist)
		.pipe(clean({force: true}))
		// .pipe(gulp.src(config.tempBuild))
		// .pipe(clean({force: true}));

});