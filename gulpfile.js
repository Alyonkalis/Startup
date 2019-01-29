var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    prefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    gutil = require ('gulp-util');



gulp.task('html', function () {
    return gulp.src('app/*.html') //Выберем файлы по нужному пути
    .pipe(gulp.dest('dist')) //Выплюнем их в папку build
    .pipe(browserSync.reload({stream: true})) //И перезагрузим наш сервер для обновлений
});

gulp.task('sсss', function() {
    return gulp.src('app/sсss/**/*.scss') //Выберем наш main.scss
    .pipe(sourcemaps.init()) //То же самое что и с js
    .pipe(sass())  //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(gulp.dest('app/css')) // выгружаем
    .pipe(cleanCSS()) //сжатие
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'})) //переименовываем .min 
    .pipe(gulp.dest('app/css')) // выгружаем
    .pipe(gulp.dest('dist/css')) // выгружаем
    .pipe(browserSync.reload({stream: true})) //И перезагрузим сервер
});

gulp.task('otherCss', function() {
    return gulp.src('app/css/**/*.min.css') //Выберем наш main.scss
    .pipe(gulp.dest('dist/css')) // выгружаем
    .pipe(browserSync.reload({stream: true})) //И перезагрузим сервер
});



gulp.task('uglify', function() {
    return gulp.src('app/js/**/*.js')
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(uglify()) //Сожмем наш js
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true})) //И перезагрузим сервер
});

gulp.task('image', function() {
    return gulp.src('app/img/*')
    .pipe(imagemin({ 
        optimizationLevel: 3,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true}))
    .pipe(gulp.dest('dist/img'))
}
);

// gulp.task('image', function() {
//     return gulp.src('app/img/**/*.{png,jpg,svg}')
//     .pipe(imagemin({ 
//         imagemin.optipng({optimizationLevel: 3}),
//         imagemin.jpegtran({progressive: true}),
//         imagemin.svgo()
//     .pipe(gulp.dest('dist/img'))
// }
// );


// gulp.task('sprite', function() {
//     var spriteData = 
//         gulp.src('app/img/sprite/*.*') // путь, откуда берем картинки для спрайта
//             .pipe(spritesmith({
//                 imgName: 'sprite.png',
//                 cssName: 'sprite.css',
//             }));

//     spriteData.img.pipe(gulp.dest('dist/img/sprite')); // путь, куда сохраняем картинку
//     spriteData.css.pipe(gulp.dest('dist/img/sprite')); // путь, куда сохраняем стили
// });


gulp.task('fonts', function() {
    return gulp.src('app/fonts')
    .pipe(gulp.dest('dist'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('app/sсss/**/*.scss', gulp.series('sсss'));
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload); //не проверено работает или нет
});

gulp.task('default', gulp.parallel('image',  'html', 'sсss', 'otherCss', 'uglify', 'fonts', 'browser-sync', 'watch'))