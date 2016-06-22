var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config').clean;
var revisionHistory = require('../config').revisionHistory;

gulp.task("CleanCss", function(){
	return gulp.src(config.styles)
		.pipe(clean());

});
gulp.task("CleanJs", function(){
	return gulp.src(config.scripts)
		.pipe(clean());

});
gulp.task("CleanImg", function(){
	return gulp.src(config.images)
		.pipe(clean());

});
gulp.task("Clean", function(){
	return gulp.src(config.dist)
		.pipe(clean({force: true}))
		// .pipe(gulp.src(config.tempBuild))
		// .pipe(clean({force: true}));

});