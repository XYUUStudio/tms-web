var gulp = require('gulp');
var scripts = require('../config').scripts;
var config = require('../config').config;
var replace = require('gulp-replace');
var dateFormat = require('dateformat');
var concat = require('gulp-concat');//合并js文件
var uglify = require('gulp-uglify');//压缩js代码

var now = new Date();

gulp.task('scripts-dev', function(){
	var verison = "TMSWEBDEV" + dateFormat(now, "yyyymmddHHMMss");
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
			scripts.src + "/scripts/myWebSocket.js"
		])
		.pipe(replace('version: "dev"', 'version: "'+ verison + '"'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));
});

gulp.task('scripts-test', function(){
	var verison = "TMSWEBTST" + dateFormat(now, "yyyymmddHHMMss");
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
		scripts.src + "/scripts/myWebSocket.js"
	])
		.pipe(replace('version: "test"', 'version: "'+ verison + '"'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));
});

gulp.task('scripts-production', function(){
	var verison = "TMSWEBPRO" + dateFormat(now, "yyyymmddHHMMss");;
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
		scripts.src + "/scripts/myWebSocket.js"
	])
		.pipe(replace('version: "production"', 'version: "'+ verison + '"'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scripts.dist));
});