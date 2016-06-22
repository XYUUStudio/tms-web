var path = require('path');
var dist = path.resolve(__dirname, "./../dist");
var src = path.resolve(__dirname, './../src');
var root = path.resolve(__dirname, './..');
var build = path.resolve(__dirname, './../build');
var tempBuild = path.resolve(__dirname, './../temp-build');

module.exports = {
	deploy:{
		dist: dist
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