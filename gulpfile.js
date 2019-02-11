var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    prefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    include = require('gulp-file-include');

gulp.task('html', function () {
    return gulp.src('app/*.html') //Выберем файлы по нужному пути
    .pipe(gulp.dest('dist')) //Выплюнем их в папку build
    .pipe(browserSync.reload({stream: true})) //И перезагрузим наш сервер для обновлений
});

gulp.task('sass', function() {
    return gulp.src('app/sсss/*.scss') //Выберем наш main.scss
    .pipe(sourcemaps.init()) //То же самое что и с js
    .pipe(sass())  //Скомпилируем
    .pipe(prefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS()) //сжатие
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css')) // выгружаем
    .pipe(rename({
        extname: '.min.css'
    }))//переименовываем .min 
    .pipe(gulp.dest('dist/css')) // выгружаем
    .pipe(browserSync.reload({stream: true})) //И перезагрузим сервер
});

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
    .pipe(include({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify()) //Сожмем наш js
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('image', () =>
    gulp.src('app/img/*')
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
         optimizationLevel: 5
    }))
    .pipe(gulp.dest('dist/img'))
);

gulp.task('fonts', function() {
    return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'dist',
            index: 'index.html'
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('reload', function(){ 
    browserSync.reload() 
});

gulp.task('watch', function() { 
    gulp.watch('app/sсss/**/*', gulp.series('sass'))
    gulp.watch('app/*.html', browserSync.reload)
    gulp.watch('app/js/**/*.js', gulp.series('js')) 
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload); 
});

gulp.task('default', gulp.parallel('image', 'fonts' , 'html', 'sass', 'browser-sync', 'watch', 'js')) 