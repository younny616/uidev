/**
 * Project path.
 */
const dirs = {
  src: 'src',
  dest: 'dist',
};

const paths = {
  html: {
    src: `${dirs.src}/app/**/*.html`,
    dest: dirs.dest,
    dir: `${dirs.src}/app`,
  },
  pugs: {
    src: `${dirs.src}/app/**/*.pug`,
    dest: dirs.dest,
    dir: `${dirs.src}/app`,
  },
  styles: {
    src: `${dirs.src}/css/index.scss`,
    dest: `${dirs.dest}/css`,
    wildcard: `${dirs.src}/css/**/*.scss`,
  },
  scripts: {
    src: `${dirs.src}/js/**/*.js`,
    dest: `${dirs.dest}/js`,
    wildcard: `${dirs.src}/js/**/*.js`,
    ignore: [
      `${dirs.src}/js/plugins/**/*.js`,
      `${dirs.src}/js/vue/**/*.js`
    ],
    ignorePath: [
        `${dirs.dest}/js/plugins`,
        `${dirs.dest}/js/vue`
    ]
  },
  images: {
    src: `${dirs.src}/images/**/*.*`,
    dest: `${dirs.dest}/images`,
    wildcard: `${dirs.src}/images/**/*.*`,
  },
  fonts: {
    src: `${dirs.src}/fonts/**/*.{ttf,otf,woff,woff2,eot,svg}`,
    dest: `${dirs.dest}/fonts`,
  }
};

module.exports = { dirs, paths };
