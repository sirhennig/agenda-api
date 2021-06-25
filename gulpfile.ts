var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
const through2 = require('through2');

gulp.task("default", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(
        through2.obj( (file, _, cb) => {
            file.contents = Buffer.from( file.contents.toString().replaceAll(/\.ts/ig, '.js') )
            cb(null, file)
        })
    ).pipe(
      gulp.src(
        [
            '*',
            '.*',
            '**/*',
            '!**/*.ts',
            '!node_modules/*'
        ]
      )
    ).pipe(gulp.dest("../dist"));
});