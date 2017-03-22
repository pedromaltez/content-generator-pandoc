require('dotenv').config()
var gulp = require('gulp');
var pandoc = require('gulp-pandoc');
var watch = require('gulp-watch');
var beautify_html = require('js-beautify').html


var pandocOpts = {
  from: 'markdown',
  to: 'html5',
  ext: '.html',
  // args: ['--smart', '--filter compiler/pandoc-filters/pandoc-include.hs']
  args: ['--smart']
}

gulp.task('build', function() {
  gulp.src([process.env.INPUT_FOLDER + '/**/*.md', '!' + process.env.INPUT_FOLDER + '/**/_*.md'])
    .pipe(pandoc(pandocOpts))
    .pipe(gulp.dest(process.env.OUTPUT_FOLDER))
});

gulp.task('watch', function() {
  watch(process.env.INPUT_FOLDER + '/**/*.md')
    .pipe(pandoc(pandocOpts))
    .pipe(gulp.dest(process.env.OUTPUT_FOLDER))
});

gulp.task('default', [ 'build' ]);
