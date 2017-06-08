var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

var path = {
	'images': {
		'in': "../in/**/*.{jpg,png,gif,svg}",
		'out': "../out/"
	}
};

// IMAGES
gulp.task('img',['clean-img'], function() {
	return gulp.src(path.images.in)
		.pipe((plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		})))
		.pipe(imagemin([imagemin.gifsicle({
			'optimizationLevel': 4
		}), imagemin.jpegtran({
			'progressive': true,
			// 'arithmetic': true
		}), imagemin.optipng({
			'optimizationLevel': 4
		}), imagemin.svgo({
			'removeViewBox': false
		})]))
		.pipe(gulp.dest(path.images.out))
		.pipe(plumber.stop());
});

gulp.task('clean-img', function () {
    return gulp.src(path.images.out, {read: false})
        .pipe(clean({force:true}));
});

gulp.task('default', ['img']);
