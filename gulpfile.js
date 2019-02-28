var gulp = require('gulp');

var mySass = require('gulp-sass');//嵌套输出方式 nested
// 展开输出方式 expanded 
// 紧凑输出方式 compact 
// 压缩输出方式 compressed 
// 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

function sass () {
	return gulp.src('./src/**/*.scss').pipe(mySass({outputStyle: 'compact'}))
				.pipe(gulp.dest('./dist'));
}
gulp.task('sass', sass);

function html () {
	return gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
}
gulp.task('html', html);

var hc = gulp.series(sass, html);
gulp.task('hc', hc);

function img() {
	return gulp.src('./src/resource/imgs/**/*.{png,jpg,gif}').pipe(gulp.dest('./dist/resource/imgs'));
}


gulp.task('img', img);


function js () {
	return gulp.src('./src/js/**/*.js')
		.pipe(gulp.dest('./dist/js'))
}
gulp.task('js', js)

function php () {
	return gulp.src('./src/js/**/*.{php,json}')
		.pipe(gulp.dest('./dist/js'))
}
gulp.task('php', php)


var build = gulp.parallel(hc, img, js, php);
gulp.task('build', build);