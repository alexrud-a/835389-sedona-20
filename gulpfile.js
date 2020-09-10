const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const svgstore = require('gulp-svgstore');
const webp = require('gulp-webp');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const del = require('del');
const csso = require('gulp-csso');
const jsmin = require('gulp-jsmin');
const htmlmin = require('gulp-htmlmin');

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

const scripts = () => {
  return gulp.src('source/js/app.js')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/js'));
}

exports.scripts = scripts;

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

exports.html = html;

const img = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
    ]))
}

exports.img = img;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const sprite = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/'));
}

exports.sprite = sprite;

const imageWebp = () => {
  return gulp.src('source/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('build/img/'))
}

exports.imageWebp = imageWebp;

const clean = () => {
  return del('build');
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/*ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

exports.copy = copy;

const imgTask = gulp.series(
  sprite,
  img,
  imageWebp,
)

exports.imgTask = imgTask;

const build = gulp.series(
  clean,
  copy,
  html,
  styles,
  scripts
);

exports.build = build;

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('source/js/**/*.js', gulp.series('scripts'));
  gulp.watch('source/*.html', gulp.series('html')).on('change', sync.reload);
}

exports.default = gulp.series(
  build, server, watcher
);
