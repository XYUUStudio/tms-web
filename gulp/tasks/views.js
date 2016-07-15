var gulp = require('gulp');
var replace = require('gulp-replace');
var views = require('../config').views;
var others = require('../config').others;

gulp.task('Views', function(){
	gulp.src(views.src).pipe(gulp.dest(views.dist));

	gulp.src(others.src + "/data/**/*").pipe(gulp.dest(others.dist + "/data"));

	gulp.src(others.src + "/images/**/*").pipe(gulp.dest(others.dist + "/images"));

	gulp.src([others.src + "/index.html"])
		.pipe(replace('styles/main.css', 'styles/main.min.css'))
		.pipe(replace('styles/login.css', 'styles/login.min.css'))

		.pipe(replace('<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-overrides.css">', '<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-overrides.min.css">'))
		.pipe(replace('<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-responsive.css">', '<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-responsive.min.css">'))
		.pipe(replace('<link rel="stylesheet" type="text/css" href="styles/bootstrap/font-awesome.css">', '<link rel="stylesheet" type="text/css" href="styles/bootstrap/font-awesome.min.css">'))

		.pipe(replace('<script src="scripts/login.js"></script>', '<script src="scripts/login.min.js"></script>'))
		.pipe(replace('<script src="config/AppConfig.js"></script>', ''))
		.pipe(replace('<script src="scripts/ajaxHelp.js"></script>', ''))
		.pipe(replace('<script src="scripts/apiPath.js"></script>', ''))
		.pipe(gulp.dest(others.dist));

	gulp.src([others.src + "/404.html",others.src + "/main.html",others.src + "/favicon.png"])
		.pipe(replace('styles/main.css', 'styles/main.min.css'))
		.pipe(replace('styles/login.css', 'styles/login.min.css'))

		.pipe(replace('<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-overrides.css">', '<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-overrides.min.css">'))
		.pipe(replace('<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-responsive.css">', '<link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap-responsive.min.css">'))
		.pipe(replace('<link rel="stylesheet" type="text/css" href="styles/bootstrap/font-awesome.css">', '<link rel="stylesheet" type="text/css" href="styles/bootstrap/font-awesome.min.css">'))

		.pipe(replace('<script src="scripts/login.js"></script>', '<script src="scripts/login.min.js"></script>'))
		.pipe(replace('<script src="config/AppConfig.js"></script>', '<script src="scripts/main.min.js"></script>'))
		.pipe(replace('<script src="scripts/ajaxHelp.js"></script>', ''))
		.pipe(replace('<script src="scripts/apiPath.js"></script>', ''))
		.pipe(replace('<script src="scripts/auth.js"></script>', ''))
		.pipe(replace('<script src="scripts/datagrid-detailview.js"></script>', ''))
		.pipe(replace('<script src="scripts/date-util.js"></script>', ''))
		.pipe(replace('<script src="scripts/easyui-theme-change.js"></script>', ''))
		.pipe(replace('<script src="scripts/jquery-loading.js"></script>', ''))
		.pipe(replace('<script src="scripts/msg.js"></script>', ''))
		.pipe(replace('<script src="scripts/easyui-theme-change.js"></script>', ''))
		.pipe(replace('<script src="scripts/main.js"></script>', ''))
		.pipe(replace('<script src="scripts/myWebSocket.js"></script>', ''))
		.pipe(replace('<script src="scripts/dsdialog.js"></script>', ''))
		.pipe(replace('<script src="scripts/common.js"></script>', ''))
		.pipe(replace('<script src="scripts/bootstrap/bootstrap.js"></script>', ''))
		.pipe(replace('<script src="scripts/bootstrap/bootstrap-editable.min.js"></script>', ''))
		.pipe(replace('<script src="scripts/bootstrap/bootstrap-timepicker.min.js"></script>', ''))
		.pipe(replace('<script src="scripts/bootstrap/bootstrap-wizard.js"></script>', ''))
		.pipe(replace('<script src="scripts/bootstrap/bootstrap-wysiwyg.js"></script>', ''))
		.pipe(gulp.dest(others.dist));
});

