var gulp = require('gulp');

var mySass = require('gulp-sass');//嵌套输出方式 nested
// 展开输出方式 expanded 
// 紧凑输出方式 compact 
// 压缩输出方式 compressed 

function sass () {
	return gulp.src('./src/**/*.scss').pipe(mySass({outputStyle: 'compact'}))
				.pipe(gulp.dest('./dist'));
}
gulp.task('sass', sass);

function html () {
	return gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
}
gulp.task('html', html);