var compileCoffeeScript = require('broccoli-coffee');
// var compileES6 = require('broccoli-traceur');
var select = require('broccoli-select');
var compileSass = require('broccoli-sass');
var mergeTrees = require('broccoli-merge-trees');
var env = require('broccoli-env').getEnv();
var pickFiles = require('broccoli-static-compiler');
var filterTemplates = require('broccoli-template');
var generateES6Modules = require('broccoli-es6-concatenator');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var uglifyJavaScript = require('broccoli-uglify-js');
var cleanCss = require('broccoli-clean-css');
// var uncss = require('broccoli-uncss');
var env = require('broccoli-env').getEnv();
var gzipFiles = require('broccoli-gzip');

// var instrument =require('broccoli-debug').instrument;
// var stripDebug = require('broccoli-strip-debug');


var app = 'app';

function preprocess(tree) {
	tree = filterTemplates(tree, {
		extensions: ['hbs'],
		compileFunction: 'Ember.Handlebars.compile'
	});

	tree  = compileCoffeeScript(tree, {
		bare: true
	});
	// tree = compileES6(tree, {
	// 	modules: false
	// })

	return tree;
};

app = pickFiles(app, {
	srcDir:'/',
	destDir:'/appkit'
})

app = preprocess(app);
var vendor = 'vendor'

var sourceTrees = [app, vendor];
var  bowerTrees = findBowerTrees();
sourceTrees = sourceTrees.concat(bowerTrees);

var appAndDependencies = new mergeTrees(sourceTrees, {overwrite: true});

var appJs = generateES6Modules(appAndDependencies, {
	loaderFile: 'loader.js',
	ignoredModules: [
		'ember/resolver'
	],
	legacyFilesToAppend: [
		'jquery.js',
		'handlebars.js',
		'ember.js',
		'ember-data.js',
		'ember-resolver.js'
	],
	wrapInEval: env !== 'production',
	inputFiles: ['appkit/**/*.js'],
	outputFile: '/assets/app.js'
});

var appSass = pickFiles(appAndDependencies, {
	srcDir: '/',
	files: ['**/*.scss'],
	destDir:'/'
});

// var appFont = pickFiles('bower_components', { // 	srcDir: '/font-awesome',
// 	files:['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff'],
// 	destDir:'/'
// });
//
 var appFont = pickFiles('bower_components', {
	srcDir: '/semantic-ui-sass/app/assets/fonts',
 	files:['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff'],
 	destDir:'/assets'
 });



var appCss = compileSass([appSass], 'appkit/styles/main.scss', 'assets/app.css');


if (env === 'production') {
	appJs = uglifyJavaScript(appJs, {
		mangle: true,
		compress: true
	});
	appCss = cleanCss(appCss);
}



module.exports = mergeTrees([appJs, appCss, appFont,'public']);
