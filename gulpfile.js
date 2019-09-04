'use strict';

const { paths } = require('./gulppath.js');
const { prettifyOptions } = require('./prettify.js');
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const pug = require('gulp-pug');
const fileinclude = require('gulp-file-include');
const prettify = require('gulp-prettify');
const mode = require('gulp-mode')();
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const del = require('del');
const glob = require('glob');

/**
 * Handle browser Sync
 */
const live = (done) => {
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

  done();
};

/**
 * html handler
 */
const html = () => {
  return src(paths.html.src)
    .pipe(fileinclude({
      prefix: '<@',
      suffix: '@>',
      basepath: `${paths.html.dir}`
    }))
    .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(prettify(prettifyOptions))
    .pipe(dest(paths.html.dest));
};

/**
 * Pug handler
 */
const pugs = () => {
  return src(paths.pugs.src)
    .pipe(pug({
      basedir: paths.pugs.dir
    }))
    .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(prettify(prettifyOptions))
    .pipe(dest(paths.pugs.dest));
};

/**
 * Styles handler
 */
const styles = () => {
  return src(paths.styles.src)
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
    .pipe(dest(paths.styles.dest));
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
    .pipe(dest(paths.scripts.dest));
};

/**
 * Plugins & Vue handler
 */
const ignore = (done) => {
    const files = paths.scripts.ignore;

    files.map((path, i) => {
      return src(path)
        .on('error', function (err) {
          console.log(err.toString());
          this.emit('end');
        })
        .pipe(dest(paths.scripts.ignorePath[i]));
    });

    done();
}

/**
 * Images handler
 */
const images = () => {
  return src(paths.images.src)
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
    .pipe(dest(paths.images.dest));
}

/**
 * Fonts handler
 */
const fonts = () => src(paths.fonts.src).pipe(dest(paths.fonts.dest));

/**
 * Clean Build
 */
const clean = (done) => {
  del.sync(['dist/**', '!dist']);

  done();
};

/**
 * Gulp task watch
 */
const watcher = (done) => {
  watch(paths.styles.wildcard, parallel(styles)).on('change', browserSync.reload);
  watch(paths.scripts.wildcard, parallel(scripts, ignore)).on('change', browserSync.reload);
  watch(paths.html.src, parallel(html)).on('change', browserSync.reload);
  watch(paths.pugs.src, parallel(pugs)).on('change', browserSync.reload);
  watch(paths.images.wildcard, parallel(images)).on('change', browserSync.reload);

  done();
};

/**
 * build Function
 */
const build = series(clean, parallel(styles, scripts, ignore, html, pugs, images, fonts));

/**
 * development Function
 */
const dev = series(build, live, watcher);

exports.live = live;
exports.styles = styles;
exports.scripts = scripts;
exports.ignore = ignore;
exports.html = html;
exports.pugs = pugs;
exports.images = images;
exports.fonts = fonts;
exports.watcher = watcher;
exports.clean = clean;
exports.dev = dev;
exports.build = build;
exports.default = build;
