'use strict';

const beautifyOptions = {
  indent_size: 2,
  extra_liners: ' ',
  indent_inner_html: false,
}

const { dirs, paths } = require('./gulppath.js');
const del = require('del');
const glob = require('glob');
const gulp = require('gulp');
const pug = require('gulp-pug');
const fileinclude = require('gulp-file-include');
const prettify = require('gulp-prettify');
const mode = require('gulp-mode')();
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const uglify= require('gulp-uglify');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/**
 * Handle browser Sync
 */
const live = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html',
      directory: false,
      https: false,
    },
    watch: true,
    port: 8080,
    open: true,
    cors: true,
    notify: false
  });
};

/**
 * html handler
 */
const html = () => {
  return gulp.src(paths.html.src)
    .pipe(fileinclude({
      prefix: '<@',
      suffix: '@>',
      basepath: `${paths.html.dir}`
    }))
    .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(prettify())
    .pipe(gulp.dest(paths.html.dest));
};

/**
 * Pug handler
 */
const pugs = () => {
  return gulp.src(paths.pugs.src)
    .pipe(pug({
      basedir: paths.pugs.dir
    }))
    .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(prettify())
    .pipe(gulp.dest(paths.pugs.dest));
};

/**
 * Styles handler
 */
const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass.sync())
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(mode.development(sourcemaps.write('.')))
    .pipe(gulp.dest(paths.styles.dest));
};

/**
 * Script handler
 */
const scripts = () => {
  const files = glob.sync(paths.scripts.src, { ignore: paths.scripts.ignore });

  const bundler = browserify({
    entries: files,
    extensions: ['.babel'],
    debug: true
  });

  return bundler.bundle()
    .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(mode.development(sourcemaps.init({
        loadMaps: true
    })))
    .pipe(minify({
        ext: {
              min: '.min.js'
        },
        mangle: true,
        preserveComments: 'all',
        ignoreFiles: ['-min.js'],
        noSource: true
    }))
    .pipe(mode.development(sourcemaps.write('./')))
    .pipe(gulp.dest(paths.scripts.dest));
};

/**
 * Plugins & Vue handler
 */
const ignore = () => {
    const files = paths.scripts.ignore;

    return files.map((path, i) => {
      return gulp.src(path)
        .on('error', function (err) {
          console.log(err.toString());
          this.emit('end');
        })
        .pipe(gulp.dest(paths.scripts.ignorePath[i]));
    });
}

/**
 * Images handler
 */
const images = () => {
  return gulp.src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
        plugins: [
          {
            removeViewBox: false,
            collapseGroups: true
          }
        ]
      })
    ]))
    .pipe(gulp.dest(paths.images.dest));
}

/**
 * Fonts handler
 */
const fonts = () => gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));

/**
 * Clean Build
 */
const clean = () => del(['dist/**', '!dist']);

/**
 * Gulp task watch usefull in development time
 */
const watch = () => {
  gulp.watch(paths.styles.wildcard, ['styles']).on('change', browserSync.reload);
  gulp.watch(paths.scripts.wildcard, ['scripts', 'ignore']).on('change', browserSync.reload);
  gulp.watch(paths.html.src, ['html']).on('change', browserSync.reload);
  gulp.watch(paths.pugs.src, ['pugs']).on('change', browserSync.reload);
  gulp.watch(paths.images.wildcard, ['images']).on('change', browserSync.reload);
};

/**
 * build Function
 */
const build = (callback) => {
  runSequence('styles', 'scripts', 'ignore', 'html', 'pugs', 'images', 'fonts', callback);
};

/**
 * development Function
 */
const dev = (callback) => {
  runSequence('build', 'live', 'watch', callback);
};

/**
 * Gulp Tasks
 */
gulp.task('live', live);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('ignore', ignore);
gulp.task('html', html);
gulp.task('pugs', pugs);
gulp.task('images', images);
gulp.task('fonts', fonts);
gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('dev', dev);
gulp.task('clean', clean);
gulp.task('default', build);
