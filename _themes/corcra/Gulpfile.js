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

    gulp.watch(['sass/**/*.scss'], ['sass:dev']);
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

gulp.task('sass:dev', function (cb) {
    var sass = require('gulp-sass');
    var combineMq = require('gulp-combine-mq');
    var sourcemaps = require('gulp-sourcemaps');

    pump([
        gulp.src('sass/main.scss'),
        sourcemaps.init(),
        sass({
            outputStyle: 'expanded'
        }),
        combineMq({
            beautify: true
        }),
        sourcemaps.write('.'),
        gulp.dest('assets/css')
    ], cb);
});

gulp.task('sass:dist', function (cb) {
    var sass = require('gulp-sass');
    var cssmin = require('gulp-cssmin');
    var combineMq = require('gulp-combine-mq');

    pump([
        gulp.src('sass/main.scss'),
        sass({
            outputStyle: 'compressed'
        }),
        combineMq({
            beautify: false
        }),
        cssmin({
            processImport: false,
            mediaMerging: false
        }),
        gulp.dest('assets/css')
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
            'sass/**/*.scss',
            '!sass/vendor/**/*.scss'
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
