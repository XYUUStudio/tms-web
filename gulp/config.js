var path = require('path');
var dist = path.resolve(__dirname, "./../dist");
var src = path.resolve(__dirname, './../src');
var root = path.resolve(__dirname, './..');
var build = path.resolve(__dirname, './../build');
var tempBuild = path.resolve(__dirname, './../temp-build');
var revisionHistory = path.normalize('/opt/revision_history');//192.168.1.84服务器,版本备份目录

var programName = "tms-web"

module.exports = {
	programName: programName,
	deploy:{
		dist: dist,
		tempBuild: tempBuild
	},
	revisionHistory:{
		dev: revisionHistory + "/dev/" + programName,
		test: revisionHistory + "/test/" + programName,
		production: revisionHistory + "/production/" + programName
	},
	config:{
		dev: build + "/dev",
		test: build + "/test",
		production: build + "/production"
	},
	scripts: {
		src: src,
		dist: dist + "/scripts",
	},
	styles:{
		src: src + "/styles/**/*",
		dist: dist + "/styles",
		rev: tempBuild + "/rev/css"
	},
	images: {
		src: src + "/images/**/*",
		dist: dist + "/images",
	},
	views: {
		src: src + "/views/**/*",
		dist: dist + "/views",
	},
	others: {
		src : src,
		dist: dist,
	},
	clean:{
		dist:dist,
		scripts: dist + "/scripts",
		styles: dist + "/styles",
		images: dist + "/images",
		tempBuild: tempBuild
	}
}