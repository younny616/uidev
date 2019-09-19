/**
 * Project configs
 */

const project = {
  title: 'store',
  build: {
    svn: 'D:/fe',
    baseDir: 'test/store',
    styles: 'css',
    scripts: 'js',
    images: 'images',
    fonts: 'fonts',
  },
  deploy: {
    echosting : '//img.echosting.cafe24.com'
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
    ],
    ignorePath: [
      `${project.dest}/js/plugins`,
      `${project.dest}/js/vue`,
      `${project.dest}/js/ui`,
    ]
  },
  images: {
    src: `${project.src}/images/**/*.*`,
    dest: `${project.dest}/images`,
    wildcard: `${project.src}/images/**/*.*`,
  },
  fonts: {
    src: `${project.src}/fonts/**/*.{ttf,otf,woff,woff2,eot,svg}`,
    dest: `${project.dest}/fonts`,
    wildcard: `${project.src}/fonts/**/*.*`,
  }
};

module.exports = { project, paths };
