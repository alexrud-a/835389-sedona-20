const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const svgSprite = require('gulp-svg-sprite');
const webp = require('gulp-webp');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const del = require('del');
const csso = require('gulp-csso');

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const img = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
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

gulp.task('svgSprite', function () {
  return gulp.src('source/img/*.svg')
    .pipe(svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg"
          }
        },
      }
    ))
    .pipe(gulp.dest('build/img/'));
});

gulp.task('webp', () =>
  gulp.src('source/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('build/img/'))
);

const clean = () => {
  return del("build");
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*ico",
    "source/**/*.html"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}

exports.copy = copy;

/*const build = () => {
  return gulp.series(
    "clean", "copy", "styles", "svgSprite"
  );
}

exports.build = build;*/

//The following tasks did not complete: build
//Did you forget to signal async completion?

const build = () => gulp.series(
  "clean",
  "copy",
  "styles",
  "svgSprite",
  "img",
  "webp",
);
exports.build = build;

/*
пробовала такой вариант. тоже не ошибка, хотя каждая задача по отдельности запускается и выполняется
const build = () => {
  return gulp.series(
    "clean", "copy", "styles", "svgSprite"
  );
}

exports.build = build;*/

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
