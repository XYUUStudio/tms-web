/**
 * Created by xuezhiyu on 16/6/17.
 */
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var myVersion = require('../util/myVersion');
var myTools = require('../util/myTools');
var gulpSequence = require('gulp-sequence');
var programName = require('../config').programName;
var deploy = require('../config').deploy;
var revisionHistory = require('../config').revisionHistory;

gulp.task('Deploy-dev',function (cb) {
    gulpSequence('Clean', ['Scripts-dev', 'Styles', 'Images'], 'Views',cb);
})

gulp.task('Deploy-test',function (cb) {
    gulpSequence('Clean', ['Scripts-test', 'Styles', 'Images'], 'Views',cb);
})

gulp.task('Deploy-production',function (cb) {
    gulpSequence('Clean', ['Scripts-production', 'Styles', 'Images'], 'Views',cb);
})

gulp.task('Generate-history-version-dev',function () {
    var folderName = programName + "-dev-TMSWEBDEV" + myVersion();
    var backPath = revisionHistory.dev + "/" + folderName;
    fs.exists(deploy.tempBuild, function(exists){
        if(exists){
            console.log("文件夹已存在,继续执行:" + path.dirname(backPath));
        } else {
            console.log("文件夹不存在,生成文件夹:" + path.dirname(backPath));
            fs.mkdir(deploy.tempBuild);
        }
        //执行版本备份
        myTools.copy(deploy.dist,backPath);
    })
})

gulp.task('Generate-history-version-test',function () {
    var folderName = programName + "-test-TMSWEBTST" + myVersion();
    var backPath = revisionHistory.dev + "/" + folderName;
    fs.exists(deploy.tempBuild, function(exists){
        if(exists){
            console.log("文件夹已存在,继续执行:" + path.dirname(backPath));
        } else {
            console.log("文件夹不存在,生成文件夹:" + path.dirname(backPath));
            fs.mkdir(deploy.tempBuild);
        }
        //执行版本备份
        myTools.copy(deploy.dist,backPath);
    })
})

gulp.task('Generate-history-version-production',function () {
    var folderName = programName + "-production-TMSWEBPRO" + myVersion();
    var backPath = revisionHistory.dev + "/" + folderName;
    fs.exists(deploy.tempBuild, function(exists){
        if(exists){
            console.log("文件夹已存在,继续执行:" + path.dirname(backPath));
        } else {
            console.log("文件夹不存在,生成文件夹:" + path.dirname(backPath));
            fs.mkdir(deploy.tempBuild);
        }
        //执行版本备份
        myTools.copy(deploy.dist,backPath);
    })
})