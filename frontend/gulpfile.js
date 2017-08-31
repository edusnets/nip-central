const fs = require('fs');
const gulp = require('gulp');
const replace = require('gulp-replace');
const mainBowerFiles = require('main-bower-files');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const ngEmbedTemplates = require('gulp-angular-embed-templates');
const flatten = require('gulp-flatten');
const runSequence = require('run-sequence');
const del = require('del');
const config = require('./config');
const gulpNgConfig = require('gulp-ng-config');
const inquirer = require("inquirer");

function setEnv(type) {
	return gulp.src("./env.tpl.json")
		.pipe(gulpNgConfig('NipCentral', {
			createModule: false,			
			wrap:true,
			constants: {
				env: type
			}
		}))
		.pipe(rename('env.js'));
};

gulp.task('default', function () {
	console.log("\nUse gulp:dev, gulp:dev-remote ou gulp:prod\n")
});

function getEnv() {
	return new Promise((resolve, reject) => {
		const args = process.argv;

		if(args.length < 4){

			return inquirer.prompt({
				type: 'list',
				name: 'env',
				message: 'Escolha um Enviroment:',
				choices: ['dev', 'dev-remote', 'prod']
			})
			.then(res => resolve(res.env));

		} else {
			const env = args.pop();
			const pattern = new RegExp(/^--dev$|^--dev-remote$|^--prod$/);
			
			if(pattern.test(env)){
				resolve(env.replace("--", ""));
			} else {
				reject("\nOpção Inválida!\n");
			}
		}
	});
}

gulp.task('env', function (){
	return getEnv()
	.then(type => setEnv(type))
	.then(task => task.pipe(gulp.dest('./src/modules')))
	.catch(ex => console.log(ex));
});

gulp.task('env:dist', function (){
	return getEnv()
	.then(type => setEnv(type))
	.then(task => task.pipe(gulp.dest(config.base.src + '/src/modules')))
	.catch(ex => console.log(ex));
});

gulp.task('dist', function () {
	return runSequence(
		'deleteDistFolder',
		'copyToTemp',
		'env:dist',
		'fonts',
		'imgs',
		'vendor-styles',
		'modules-styles',
		'vendor-scripts',
		'modules-scripts',
		'directives-scripts',
		'generate-index',
		'removeTemp'
	);
});

gulp.task('deleteDistFolder', function () {
	del.sync(['dist/**']);
});

gulp.task('copyToTemp', function () {
	return gulp.src(['assets/**','src/**'], {base: "."})
	.pipe(gulp.dest('.temp'))
});

gulp.task('removeTemp', function () {
	return del.sync(['.temp']);
});

gulp.task('modules-styles', function () {
	return gulp.src('.temp/assets/css/**/*.css')
		.pipe(csso())
		.pipe(concat('modules.concat.css'))
		.pipe(rename(Date.now() + '.modules.min.css'))
		.pipe(gulp.dest(config.modules.dest));
});

gulp.task('modules-scripts', function () {
	return gulp.src(config.modules.src + '/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(ngEmbedTemplates({ basePath: './' }))
		.pipe(concat('modules.concat.js'))
		// .pipe(uglify())
		.pipe(rename(Date.now() + '.modules.min.js'))
		.pipe(gulp.dest(config.modules.dest));
});

gulp.task('directives-scripts', function () {
	return gulp.src(config.directives.src + '/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(ngEmbedTemplates({ basePath: './' }))
		.pipe(replace(/<link?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/, function (s, link) {
			let embed = link.match(/([^"\.]+\.css)/)[0];
			return '<style>' + fs.readFileSync(embed, 'utf8') + '</style>';
		}))
		.pipe(replace(/\n/g, ''))
		.pipe(concat('directives.concat.js'))
		.pipe(rename(Date.now() + '.directives.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.directives.dest));
});

gulp.task("vendor-scripts", function () {
	return gulp.src(mainBowerFiles(['!**/*.min.js', '**/*.js']))
		.pipe(concat(Date.now() + '.vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.vendor.dest));
});

gulp.task('vendor-styles', function () {
	return gulp.src([config.vendor.src + '/*.min.css', config.vendor.src + 'bootstrap-daterangepicker/daterangepicker.css'])
		// .pipe(csso())
		.pipe(concat('vendor.concat.css'))
		.pipe(rename(Date.now() + '.vendor.min.css'))
		.pipe(gulp.dest(config.vendor.dest));
});

gulp.task('fonts', function () {
	return gulp.src(config.fonts.src + '/*.{eot,svg,ttf,woff,woff2}')
		.pipe(flatten())
		.pipe(gulp.dest(config.fonts.dest));
});

gulp.task('imgs', function () {
	return gulp.src(config.imgs.src + '/*')
		.pipe(flatten())
		.pipe(gulp.dest(config.imgs.dest));
});

gulp.task("generate-index", function () {
	return gulp.src('./index.html')
		.pipe(
			inject(
				gulp.src(config.vendor.dest + '*.min.css', {
					read: false
				}), {
					name: 'vendor-styles',
					transform: function (filepath, file, i, length) {
						return '<link rel="stylesheet" type="text/css" href="' + filepath.replace('dist/', '') + '">';
					}
				}
			)
		)
		.pipe(
			inject(
				gulp.src(config.modules.dest + '*.min.css', {
					read: false
				}), {
					name: 'modules-styles',
					transform: function (filepath, file, i, length) {
						return '<link rel="stylesheet" type="text/css" href="' + filepath.replace('dist/', '') + '">';
					}
				}
			)
		)
		.pipe(
			inject(
				gulp.src(config.vendor.dest + '*.min.js', {
					read: false
				}), {
					name: 'vendor-scripts',
					transform: function (filepath, file, i, length) {
						return '<script type="text/javascript" src="' + filepath.replace('dist/', '') + '"></script>';
					}
				}
			)
		)
		.pipe(
			inject(
				gulp.src(config.modules.dest + '*.min.js', {
					read: false
				}), {
					name: 'modules-scripts',
					transform: function (filepath, file, i, length) {
						return '<script type="text/javascript" src="' + filepath.replace('dist/', '') + '"></script>';
					}
				}
			)
		)
		.pipe(
			inject(
				gulp.src(config.directives.dest + '*.min.js', {
					read: false
				}), {
					name: 'directives-scripts',
					transform: function (filepath, file, i, length) {
						return '<script type="text/javascript" src="' + filepath.replace('dist/', '') + '"></script>';
					}
				}
			)
		)
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
	}
);
