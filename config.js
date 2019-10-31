/**
 * Project configs
 */

const project = {
  title: 'store',
  build: {
    svn: 'D:/fe',
    baseDir: 'API/store',
    etcDir: 'img.echosting.cafe24.com/api/store',
    styles: 'css',
    scripts: 'js',
    images: 'images',
    svg: 'svg',
    fonts: 'fonts',
  },
  deploy: {
    echosting : '/'
  },
  src: 'src',
  dest: 'dist',
};

const paths = {
  html: {
    src: `${project.src}/app/**/*.html`,
    dest: project.dest,
    dir: `${project.src}/app`,
  },
  pugs: {
    src: `${project.src}/app/**/*.pug`,
    dest: project.dest,
    dir: `${project.src}/app`,
  },
  styles: {
    src: `${project.src}/css/index.scss`,
    dest: `${project.dest}/css`,
    wildcard: `${project.src}/css/**/*.scss`,
  },
  scripts: {
    src: `${project.src}/js/**/*.js`,
    dest: `${project.dest}/js`,
    wildcard: `${project.src}/js/**/*.js`,
    ignore: [
      `${project.src}/js/plugins/**/*.js`,
      `${project.src}/js/vue/**/*.js`,
      `${project.src}/js/ui/**/*.js`,
      `${project.src}/js/data/**/*.js`,
    ],
    ignorePath: [
      `${project.dest}/js/plugins`,
      `${project.dest}/js/vue`,
      `${project.dest}/js/ui`,
      `${project.dest}/js/data`,
    ],
    cachedData: `${project.src}/js/data/**/*.js`,
  },
  images: {
    src: `${project.src}/images/**/*.*`,
    dest: `${project.dest}/images`,
    wildcard: `${project.src}/images/**/*.*`,
  },
  svg: {
    src: `${project.src}/svg/**/*.*`,
    dest: `${project.dest}/images`,
    wildcard: `${project.src}/svg/**/*.*`,
  },
  fonts: {
    src: `${project.src}/fonts/**/*.{ttf,otf,woff,woff2,eot,svg}`,
    dest: `${project.dest}/fonts`,
    wildcard: `${project.src}/fonts/**/*.*`,
  }
};

module.exports = { project, paths };
