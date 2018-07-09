var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cleanCSS      = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename'),
    inject        = require('gulp-inject'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    plumber       = require('gulp-plumber'),
    babel         = require('gulp-babel'),
    browserify    = require('gulp-browserify'),
    clean         = require('gulp-clean'),
    sourcemaps    = require('gulp-sourcemaps'),
    htmlmin       = require('gulp-html-minifier'),
    browserSync   = require('browser-sync');

var src           = './src/',
    dist          = './dist/';

// Gulp Task
// Minify HTML

// Taskname 'html'
gulp.task('html', function () {
    //-> löscht alle Dateien mit der Endung .html im Verzeichnis /dist
    gulp.src(dist + '*.html',{force: true})
        .pipe(clean());
    // nimmt alle Dateien aus dem Verzeichnis /src und erstellt eine minifizierte Version im Verzeichnis /dist
    gulp.src(src + '*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist));
});

// #################################
// Watch

// Der Befehl gulp ruft standardmäig den Task 'default' auf.
gulp.task('default', function(){
    //-> Überwacht alle Dateien mit der Endung .html im Verzeichnis /html
    gulp.watch([src + '*.html'],['html']);
});