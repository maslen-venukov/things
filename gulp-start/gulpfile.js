const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fileInclude = require('gulp-file-include');
const del = require('del');
const imageMin = require('gulp-imagemin');

gulp.task('sass', () => {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: 'false'//,
      // browsers: ['last 5 versions', '> 1%']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// gulp.task('html', () => {
//   return gulp.src('app/**/*.html')
//     .pipe(browserSync.stream());
// });

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('libs', () => {
  return gulp.src([
    'node_modules/swiper/swiper-bundle.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
  gulp.src('app/fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest('dist/fonts'))
  return gulp.src('app/fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('img', () => {
  return gulp.src('app/img/**/*')
    .pipe(imageMin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('watch', () => {
  gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
  gulp.watch('app/**/*.html', gulp.parallel('html'));
  gulp.watch('app/js/**/*.js', gulp.parallel('js'));
  gulp.watch('app/fonts/**/*.ttf', gulp.parallel('fonts'));
  gulp.watch('app/img/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'sass', 'js', 'libs', 'fonts', 'img', 'browser-sync', 'watch')));