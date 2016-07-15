var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var scripts = require('../config').scripts;
var config = require('../config').config;
var replace = require('gulp-replace');
var concat = require('gulp-concat');//合并js文件
var uglify = require('gulp-uglify');//压缩js代码
var myVersion = require('../util/myVersion');

gulp.task('Scripts-dev', function(){
	var version = "TMSWEBDEV" + myVersion();
	gulp.src(scripts.src + "/scripts/login.js")
		.pipe(concat('login.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));

	gulp.src([
			config.dev 	+ "/AppConfig.js",
			scripts.src + "/scripts/apiPath.js",
			scripts.src + "/scripts/ajaxHelp.js",
			scripts.src + "/scripts/datagrid-detailview.js",
			scripts.src + "/scripts/easyui-theme-change.js",
			scripts.src + "/scripts/jquery-loading.js",
			scripts.src + "/scripts/date-util.js",
			scripts.src + "/scripts/auth.js",
			scripts.src + "/scripts/main.js",
			scripts.src + "/scripts/msg.js",
			scripts.src + "/scripts/myWebSocket.js",
			scripts.src + "/scripts/dsdialog.js",
			scripts.src + "/scripts/common.js",
			scripts.src + "/scripts/bootstrap/bootstrap.js",
			scripts.src + "/scripts/bootstrap/bootstrap-editable.min.js",
			scripts.src + "/scripts/bootstrap/bootstrap-timepicker.min.js",
			scripts.src + "/scripts/bootstrap/bootstrap-wizard.js",
			scripts.src + "/scripts/bootstrap/bootstrap-wysiwyg.js"
		])
		.pipe(replace('version: "dev"', 'version: "'+ version + '"'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));

});

gulp.task('Scripts-test', function(){
	var version = "TMSWEBTST" + myVersion();
	gulp.src(scripts.src + "/scripts/login.js")
		.pipe(concat('login.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));

	gulp.src([
		config.test 	+ "/AppConfig.js",
		scripts.src + "/scripts/apiPath.js",
		scripts.src + "/scripts/ajaxHelp.js",
		scripts.src + "/scripts/datagrid-detailview.js",
		scripts.src + "/scripts/easyui-theme-change.js",
		scripts.src + "/scripts/jquery-loading.js",
		scripts.src + "/scripts/date-util.js",
		scripts.src + "/scripts/auth.js",
		scripts.src + "/scripts/main.js",
		scripts.src + "/scripts/msg.js",
		scripts.src + "/scripts/myWebSocket.js",
		scripts.src + "/scripts/dsdialog.js",
		scripts.src + "/scripts/common.js",
		scripts.src + "/scripts/bootstrap/bootstrap.js",
		scripts.src + "/scripts/bootstrap/bootstrap-editable.min.js",
		scripts.src + "/scripts/bootstrap/bootstrap-timepicker.min.js",
		scripts.src + "/scripts/bootstrap/bootstrap-wizard.js",
		scripts.src + "/scripts/bootstrap/bootstrap-wysiwyg.js"
	])
		.pipe(replace('version: "test"', 'version: "'+ version + '"'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));
});

gulp.task('Scripts-production', function(){
	var version = "TMSWEBPRO" + myVersion();
	gulp.src(scripts.src + "/scripts/login.js")
		.pipe(concat('login.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));

	gulp.src([
		config.production 	+ "/AppConfig.js",
		scripts.src + "/scripts/apiPath.js",
		scripts.src + "/scripts/ajaxHelp.js",
		scripts.src + "/scripts/datagrid-detailview.js",
		scripts.src + "/scripts/easyui-theme-change.js",
		scripts.src + "/scripts/jquery-loading.js",
		scripts.src + "/scripts/date-util.js",
		scripts.src + "/scripts/auth.js",
		scripts.src + "/scripts/main.js",
		scripts.src + "/scripts/msg.js",
		scripts.src + "/scripts/myWebSocket.js",
		scripts.src + "scripts/dsdialog.js",
		scripts.src + "/scripts/common.js",
		scripts.src + "/scripts/bootstrap/bootstrap.js",
		scripts.src + "/scripts/bootstrap/bootstrap-editable.min.js",
		scripts.src + "/scripts/bootstrap/bootstrap-timepicker.min.js",
		scripts.src + "/scripts/bootstrap/bootstrap-wizard.js",
		scripts.src + "/scripts/bootstrap/bootstrap-wysiwyg.js"
	])
		.pipe(replace('version: "production"', 'version: "'+ version + '"'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));
});