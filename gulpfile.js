const gulp = require('gulp');
//tasks
require('./gulp/dev.js');
require('./gulp/docs.js');
require('./gulp/fontsDev.js');
require('./gulp/fontsDocs.js');



gulp.task('default', 
gulp.series(
  'clean:dev','fontsDev',
  gulp.parallel('sass:dev','images:dev', 'pug:dev','fonts:dev','js:dev' ),
  gulp.parallel('server:dev','watch:dev'),
))

gulp.task('docs', 
gulp.series(
  'clean:docs','fontsDocs',
  gulp.parallel('sass:docs','images:docs', 'pug:docs','fonts:docs','js:docs' ),
  gulp.parallel('server:docs'),
))