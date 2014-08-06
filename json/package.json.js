/**
 * Module dependencies
 */

var _ = require('lodash')
	, util = require('util');



/**
 * 
 * @param  {[type]} scope [description]
 * @return {[type]}       [description]
 */
module.exports = function dataForPackageJSON (scope) {

	var sailsPkg = scope.sailsPackageJSON || {};

	// To determine the sails dep. to inject in the newly created package.json,
	// use `sails.prerelease` specified in the package.json of Sails itself.
	// If a `prerelease` version no. is not specified, just use `version`
	var sailsVersionDependency = (sailsPkg.sails && sailsPkg.sails.prerelease) || ('~' + sailsPkg.version);

	return _.defaults(scope.appPackageJSON || {}, {
		name: scope.appName,
		private: true,
		version: '0.0.0',
		description: 'a Sails application',
		keywords: [],
		dependencies: {
			'sails'      : sailsVersionDependency,
			'sails-disk' : getDependencyVersion(sailsPkg, 'sails-disk'),
			'rc'         : getDependencyVersion(sailsPkg, 'rc'),
			'include-all': getDependencyVersion(sailsPkg, 'include-all'),
			'ejs'        : getDependencyVersion(sailsPkg, 'ejs'),
			'gulp'      : getDependencyVersion(sailsPkg, 'gulp'),
			'gulp-autoprefixer' : getDependencyVersion(sailsPkg, 'gulp-autoprefixer'),
			'gulp-cache': getDependencyVersion(sailsPkg, 'gulp-cache'),
			'gulp-coffee': getDependencyVersion(sailsPkg, 'gulp-coffee'),
			'gulp-concat': getDependencyVersion(sailsPkg, 'gulp-concat'),
			'gulp-imagemin': getDependencyVersion(sailsPkg, 'gulp-imagemin'),
			'gulp-jade': getDependencyVersion(sailsPkg, 'gulp-jade'),
			'gulp-jshint': getDependencyVersion(sailsPkg, 'gulp-jshint'),
			'gulp-jst': getDependencyVersion(sailsPkg, 'gulp-jst'),
			'gulp-less': getDependencyVersion(sailsPkg, 'gulp-less'),
			'gulp-linker': getDependencyVersion(sailsPkg, 'gulp-linker'),
			'gulp-livereload': getDependencyVersion(sailsPkg, 'gulp-livereload'),
			'gulp-load-plugins': getDependencyVersion(sailsPkg, 'gulp-load-plugins'),
			'gulp-minify-css': getDependencyVersion(sailsPkg, 'gulp-minify-css'),
			'gulp-notify': getDependencyVersion(sailsPkg, 'gulp-notify'),
			'gulp-rename': getDependencyVersion(sailsPkg, 'gulp-rename'),
			'gulp-rimraf': getDependencyVersion(sailsPkg, 'gulp-rimraf'),
			'gulp-sass': getDependencyVersion(sailsPkg, 'gulp-sass'),
			'gulp-uglify': getDependencyVersion(sailsPkg, 'gulp-uglify'),
			'gulp-util': getDependencyVersion(sailsPkg, 'gulp-util'),
			'run-sequence': getDependencyVersion(sailsPkg, 'run-sequence')
		},
		scripts: {
			start: 'node app.js',
			debug: 'node debug app.js'
		},
		main: 'app.js',
		repository: {
			type: 'git',
			url: util.format('git://github.com/%s/%s.git', scope.github.username, scope.appName)
		},
		author: scope.author || '',
		license: ''
	});
};





/**
 * getDependencyVersion
 * 
 * @param  {Object} packageJSON
 * @param  {String} module
 * @return {String}
 * @api private
 */

function getDependencyVersion (packageJSON, module) {
	return (
		packageJSON.dependencies && packageJSON.dependencies[module] ||
		packageJSON.devDependencies && packageJSON.devDependencies[module] ||
		packageJSON.optionalDependencies && packageJSON.optionalDependencies[module]
	);
}
