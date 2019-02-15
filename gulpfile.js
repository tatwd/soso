var { src, dest, watch, series, lastRun } = require('gulp');
var { reload, init, stream } = require('browser-sync').create();
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
// var wait = require('gulp-wait');
var { SRC_DIR } = require('./config');

// css compile and bundle
function css(next) {
  src(SRC_DIR.CSS.ENTRY)
    //.pipe(wait(200)) // 200ms delay
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest(SRC_DIR.CSS.OUTPUT))
    .pipe(
      reload({
        stream: true
      })
    );
  next();
}

// minify js task
function minify(next) {
  src(SRC_DIR.JS.TEST)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(SRC_DIR.JS.OUTPUT))
    .pipe(stream());
  next();
}

// start a server
function serve(next) {
  init({
    server: {
      baseDir: './',
      index: 'demo.html'
    }
  });

  watch(SRC_DIR.CSS.INPUT, css);
  watch(SRC_DIR.JS.TEST, minify);
  watch(SRC_DIR.HTML.INPUT).on('change', reload);

  next();
}

// for travis ci
function travis(next) {
  console.log('Run gulp tasks successfully!');
  next();
  process.exit(0);
}

exports.travis = series(minify, css, travis);
exports.default = series(minify, css, serve);
