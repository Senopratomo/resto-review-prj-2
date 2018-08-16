var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('default', ['copy-html', 'copy-images', 'copy-styles', 'copy-js'], function() {
    gulp.watch('src/css/*.css', ['copy-styles']);
    gulp.watch('src/js/*.js', ['copy-js']);
    gulp.watch('src/index.html', ['copy-html']);
    gulp.watch('src/restaurant.html', ['copy-html']);
    gulp.watch('./dist/index.html').on('change', browserSync.reload);

	browserSync.init({
		server: "./dist"
	});
	browserSync.stream();
});

gulp.task('dist', [
    'copy-html',
    'copy-images',
    'copy-styles',
    'copy-js'
]);

gulp.task('copy-js', function() {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('copy-html', function() {
    gulp.src(['src/index.html','src/restaurant.html'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-styles', function() {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});