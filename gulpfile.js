const gulp = require('gulp');
const electron = require('electron-connect').server.create();
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');

process.env.DCE_DEBUG=true;

gulp.task('serve', function (callback) {
    gulp.watch('main.js', ['electron:restart']);
    gulp.watch(['src/**/*.scss', 'src/**/*.jsx', 'src/**/*.js', 'src/**/*.html', 'src/**/*.css', 'src/**/*.png'], ['build:dev']);

    runSequence('electron:start', 'build:dev');
});
gulp.task('build:dev', function (callback) {
    runSequence('copy:static',
        ['jsx2js', 'sass'],
        'electron:reload',
        callback);
});
gulp.task('electron:start', () => electron.start());
gulp.task('electron:reload', () => electron.reload());
gulp.task('electron:restart', () => electron.restart());
gulp.task('copy:static', () => {
    gulp.src(['src/**/*.html', 'src/**/*.png'])
        .pipe(gulp.dest('dist'));
});
gulp.task('jsx2js', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            plugins: ['transform-react-jsx']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});