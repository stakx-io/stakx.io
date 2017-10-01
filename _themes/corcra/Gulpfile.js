var gulp = require('gulp');
var pump = require('pump');


///
// Dev Functionality
///

gulp.task('dev:server', function() {
    var express = require('express');
    var app = express();

    app.use(require('connect-livereload')({port: 35729}));
    app.use(express.static("../../_site"));
    app.listen(8000, '0.0.0.0');
});

gulp.task('dev:watch', function() {
    var tinylr = require('tiny-lr')();
    tinylr.listen(35729);

    gulp.watch(['_sass/**/*.scss'], ['sass:dev']);
    gulp.watch(['../../_site/**'], function (event) {
        var fileName = require('path').relative(__dirname, event.path);

        tinylr.changed({
            body: {
                files: [fileName]
            }
        });
    });
});


///
// Sass Functionality
///

var sass = require('gulp-sass');
var combineMq = require('gulp-combine-mq');
var moduleImporter = require('sass-module-importer');

var SASS_FILE = '_sass/main.scss';
var SASS_DEST = 'assets/css';

gulp.task('sass:dev', function (cb) {
    var sourcemaps = require('gulp-sourcemaps');

    pump([
        gulp.src(SASS_FILE),
        sourcemaps.init(),
        sass({
            importer: moduleImporter(),
            outputStyle: 'expanded'
        }),
        combineMq({
            beautify: true
        }),
        sourcemaps.write('.'),
        gulp.dest(SASS_DEST)
    ], cb);
});

gulp.task('sass:dist', function (cb) {
    var cssmin = require('gulp-cssmin');
    var postcss = require('gulp-postcss');
    var unprefix = require('postcss-unprefix');
    var removePrefixes = require('postcss-remove-prefixes');

    pump([
        gulp.src(SASS_FILE),
        sass({
            importer: moduleImporter(),
            outputStyle: 'compressed'
        }),
        combineMq({
            beautify: false
        }),
        postcss([
            unprefix(),
            removePrefixes()
        ]),
        cssmin({
            processImport: false,
            mediaMerging: false
        }),
        gulp.dest(SASS_DEST)
    ], cb);
});

gulp.task("sass:lint", function(cb) {
    var syntax_scss = require('postcss-scss');
    var stylelint  = require('stylelint');
    var reporter   = require('postcss-reporter');
    var postcss    = require('gulp-postcss');
    var processors = [
        stylelint(),
        reporter({
            clearMessages: true,
            throwError: true
        })
    ];

    pump([
        gulp.src([
            '_sass/**/*.scss',
            '!_sass/vendor/**/*.scss'
        ]),
        postcss(processors, {
            syntax: syntax_scss
        })
    ], cb);
});


///
// Gulp Tasks
///

gulp.task('dev', ['sass:dev', 'dev:server', 'dev:watch']);
gulp.task('dist', ['sass:dist']);
