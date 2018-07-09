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

// Gulp Tasks

// #################################
// Minify SASS

// Taskname 'sass'
gulp.task('sass', function () {
    //-> erstellt im Verzeichnis /dist das Verzeichnis /assets/css mit dem Datei Namen *.scss
    gulp.src(src + 'assets/scss/*.scss')
        // Sourcemap wird initialliisiert
        .pipe(sourcemaps.init())
            // Plugin plumber führt Task auch nach Fehler weiter aus
            .pipe(plumber())
            // Plugin sass wandelt sass/scss Dateien in css Dateien um
            .pipe(sass())
            // Plugin prefixer ergänzt prefixe
            .pipe(autoprefixer())
            // Plugin rename benennt Datei um in style.css
            .pipe(rename({ basename: 'style'}))
            // Plugin cleanCSS minifiziert CSS Datei
            .pipe(cleanCSS())
            // Plugin rename benennt Datei um in style.min.css
            .pipe(rename({ suffix: '.min'}))
        // schreibt Sourcemap in das Verzeichnis in der auch die CSS Datei liegt
        .pipe(sourcemaps.write('.'))
        // erstellt Verzeichnis /assets/css im Ordner /dist
        .pipe(gulp.dest(dist + 'assets/css'));
});

// #################################
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
    gulp.watch([src + 'assets/scss/*.scss'],['sass']);
});