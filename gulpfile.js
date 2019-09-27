'use strict';

const { project, paths } = require('./config');
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const pug = require('gulp-pug');
const fileinclude = require('gulp-file-include');
const prettify = require('gulp-prettify');
const prettifyOptions = require('./prettify');
const mode = require('gulp-mode')({ modes: ['production', 'development', 'deploy'] });
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
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
const decache = require('decache');
const stringify = require('js-stringify');




/**
 * Mode Variables
 */
const isDeploy = mode.deploy();
const isProduction = mode.production();
const buildPath = `${project.build.svn}/${project.build.baseDir}`;

const buildReplace = (onDeploy) => {
  return replace(/(src|href)="([^"]*)"/g, (match, param, string, offset) => {
    let protocol = /(?:((http(s?))\:)?\/\/)/g;
    let baseDir = `${project.build.baseDir}${string}`;

    if (!protocol.test(string) && string.length > 1 && string.charAt(0) !== '#' && string.charAt(0) !== '{' && string.charAt(0) !== '!') {
      if (onDeploy) {
        let image = /\.(?:jpg|gif|png|svg)/g;

        if (image.test(string)) return `${param}="${project.deploy.echosting}/${baseDir}"`;
      }
      return `${param}="/${baseDir}"`;
    } else {
      return `${param}="${string}"`;
    }
  });
};


/**
 * BrowserSync handler
 */
const live = (done) => {
  browserSync.init({
    server: {
      baseDir: `./${project.dest}`,
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
 * Html handler
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
    .pipe(mode.production(buildReplace(isDeploy)))
    .pipe(prettify(prettifyOptions))
    .pipe(!isProduction ? dest(paths.html.dest) : dest(buildPath))
};


/**
 * Pug handler
 */
const pugs = () => {
  const cachedFiles = glob.sync(paths.scripts.cachedData);

  cachedFiles.forEach(path => {
    decache(`./${path}`);
  });

  return src(paths.pugs.src)
    .pipe(pug({
      basedir: paths.pugs.dir,
      locals: {
        require,
        stringify,
      },
    }))
    .on('error', function (err) {
        console.log(err.message.toString());
        this.emit('end');
    })
    .pipe(mode.production(buildReplace(isDeploy)))
    .pipe(prettify(prettifyOptions))
    .pipe(!isProduction ? dest(paths.pugs.dest) : dest(buildPath));
};


/**
 * Styles handler
 */
const styles = () => {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync())
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        basename: project.title,
        suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(!isProduction ? dest(paths.styles.dest) : dest(`${buildPath}/${project.build.styles}`));
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
    .pipe(source(`${project.title}.bundle.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({
        loadMaps: true
    }))
    .pipe(minify({
        ext: {
              min: '.min.js'
        },
        mangle: true,
        preserveComments: 'all',
        ignoreFiles: ['-min.js'],
        noSource: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(!isProduction ? dest(paths.scripts.dest) : dest(`${buildPath}/${project.build.scripts}`));
};


/**
 * Ignores handler
 */
const ignore = (done) => {
  const files = paths.scripts.ignore;

  files.map((path, i) => {
    return src(path)
      .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
      })
      .pipe(!isProduction ? dest(paths.scripts.ignorePath[i]) : dest(`${buildPath}/js/${paths.scripts.ignorePath[i].slice(paths.scripts.ignorePath[i].lastIndexOf('/') + 1)}`));
  });

  done();
}


/**
 * Images handler
 */
const images = () => {
  return src(paths.images.src)
    .pipe(mode.production(
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
    ])))
    .pipe(!isProduction ? dest(paths.images.dest) : dest(`${buildPath}/${project.build.images}`))
}


/**
 * Fonts handler
 */
const fonts = () => src(paths.fonts.src).pipe(!isProduction ? dest(paths.fonts.dest) : dest(`${buildPath}/${project.build.fonts}`));


/**
 * Clean handler
 */
const clean = (done) => {
  // const inquirer = require('inquirer'); 검증절차 추가 필수

  if (mode.production()) {
    del.sync([`${buildPath}/**`, `!${project.title}`], { force: true });
  } else {
    del.sync(['dist/**', '!dist']);
  }

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
  watch(paths.fonts.wildcard, parallel(fonts)).on('change', browserSync.reload);

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
