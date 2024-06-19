const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sassGlob = require('gulp-sass-glob');
// const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');

const server =require('gulp-server-livereload');
const clean =require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries')
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const rename = require('gulp-rename');

const changed = require('gulp-changed');


gulp.task('clean:docs', function(done){

   if (fs.existsSync('./docs/')){

  return gulp.src('./docs/',{read:false}).pipe(clean());

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

gulp.task('pug:docs',function(){
  return gulp.src('src/pug/pages/*.pug')
  .pipe(plumber(plumberNotify('pug')))
  .pipe(pug())
  .pipe(htmlclean())
  .pipe(webpHTML())
  .pipe(gulp.dest('./docs/'))
});

gulp.task('sass:docs', function(){

  return gulp.src('src/scss/main.scss')
  .pipe(changed('./docs/css/'))
  .pipe(plumber(plumberNotify('sass')))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(groupMedia())
    .pipe(sass())
    // .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css/'))
})

//Copy images//
gulp.task('images:docs', function () {
	return (
		gulp
			.src(['./src/img/**/*', '!./src/img/svgicons/**/*','!./src/img/sprite/**/*','!./src/img/favicons/**/*'],{ encoding: false })
			.pipe(changed('./docs/img/'))
			.pipe(
				imagemin([
					imageminWebp({
						quality: 85,
					}),
				])
			)
			.pipe(rename({ extname: '.webp' }))
			.pipe(gulp.dest('./docs/img/'))
			.pipe(gulp.src('./src/img/**/*'))
			.pipe(changed('./docs/img/'))
			.pipe(
				imagemin(
					[
						imagemin.gifsicle({ interlaced: true }),
						imagemin.mozjpeg({ quality: 85, progressive: true }),
					],
					{ verbose: true }
				)
			)
			.pipe(gulp.dest('./docs/img/'))
	);
});


gulp.task('fonts:docs', function(){
  return gulp.src('src/fonts/**/*')
  .pipe(changed('./docs/fonts/'))
  .pipe(gulp.dest('./docs/fonts'))
})

gulp.task('libs:docs', function(){
  return gulp.src('src/libs/**/*')
  .pipe(changed('./docs/libs/'))
  .pipe(gulp.dest('docs/libs'))
})

gulp.task('js:docs', function(){
  return gulp.src('./src/js/*.js')
  .pipe(changed('./docs/js/'))
  .pipe(plumber(plumberNotify('js')))
  .pipe(babel())
  .pipe(webpack(require('../webpack.config.js')))
  .pipe(gulp.dest('./docs/js'))
})
//server//
gulp.task('server:docs',function(){
  return gulp.src('./docs/').pipe(server({
    livereload: true,
    open:true
  }))
})


