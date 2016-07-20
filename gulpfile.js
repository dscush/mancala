var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    del = require('del'),
    wiredep = require('wiredep'),
    path = require('path'),
    useref = require('gulp-useref');


gulp.task('html', () => {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('.tmp'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('useref', ['html', 'scripts', 'sass'], function() {
    return gulp.src('.tmp/**/*.html')
    .pipe(useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe(gulp.dest('dist'))
})

gulp.task('browserSync', function() {
    browserSync({
        notify: false,
        server: {
            baseDir: 'dist'
        },
        port: 8080
    })
})
/*
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('dist/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('dist'));
});
*/
gulp.task('build', ['useref'], function() {
    
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['build', 'browserSync'], function() {
  gulp.watch('app/styles/*.scss', ['useref']);
  gulp.watch('app/scripts/*.js', ['useref']);
  gulp.watch('app/index.html', ['useref']);
  //gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('default', ['clean'], () => {
  gulp.start('watch');
});