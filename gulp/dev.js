const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const server =require('gulp-server-livereload');
const clean =require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
// const groupMedia = require('gulp-group-css-media-queries')
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const sassGlob = require('gulp-sass-glob');
const imageminWebp = require('imagemin-webp');
const rename = require('gulp-rename');



gulp.task('clean:dev', function(done){

   if (fs.existsSync('./build/')){

  return gulp.src('./build/',{read:false}).pipe(clean());

   }
   done();
})


const plumberNotify = (title) => {
  return{
    errorHandler:notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  };
}

gulp.task('pug:dev',function(){
  return gulp.src('src/pug/pages/*.pug')
  .pipe(changed('./build/'))
  .pipe(plumber(plumberNotify('pug')))
  .pipe(pug())
  .pipe(gulp.dest('build/'))
});

gulp.task('sass:dev', function(){

  return gulp.src('src/scss/main.scss')
  .pipe(changed('./build/css/'))
  .pipe(plumber(plumberNotify('sass')))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('build/css/'))
})

//Copy images//
gulp.task('images:dev', function () {
	return (
		gulp
			.src(['./src/img/**/*', '!./src/img/svgicons/**/*','!./src/img/sprite/**/*','!./src/img/favicons/**/*'],{ encoding: false })
			.pipe(changed('./build/img/'))
			.pipe(
				imagemin([
					imageminWebp({
						quality: 85,
					}),
				])
			)
			.pipe(rename({ extname: '.webp' }))
			.pipe(gulp.dest('./build/img/'))
			.pipe(gulp.src('./src/img/**/*'))
			.pipe(changed('./build/img/'))
			.pipe(
				imagemin(
					[
						imagemin.gifsicle({ interlaced: true }),
						imagemin.mozjpeg({ quality: 85, progressive: true }),
					],
					{ verbose: true }
				)
			)
			.pipe(gulp.dest('./build/img/'))
	);
});

gulp.task('fonts:dev', function(){
  return gulp.src('src/fonts/**/*')
  .pipe(changed('./build/fonts/'))
  .pipe(gulp.dest('build/fonts'))
})

gulp.task('libs:dev', function(){
  return gulp.src('src/libs/**/*')
  .pipe(changed('./build/libs/'))
  .pipe(gulp.dest('build/libs'))
})
gulp.task('js:dev', function(){
  return gulp.src('./src/js/*.js')
  .pipe(changed('./build/js/'))
  .pipe(plumber(plumberNotify('js')))
  // .pipe(babel())
  .pipe(webpack(require('./../webpack.config.js')))
  .pipe(gulp.dest('./build/js'))
})
//server//
gulp.task('server:dev',function(){
  return gulp.src('./build/').pipe(server({
    livereload: true,
    open:true
  }))
})

gulp.task('watch:dev', function(){
   gulp.watch('./src/scss/**/*.scss',gulp.parallel('sass:dev'));
   gulp.watch('./src/pug/**/*.pug', gulp.parallel('pug:dev'));
   gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
   gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
   gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
   gulp.watch('./src/libs/**/*', gulp.parallel('libs:dev'));
})

