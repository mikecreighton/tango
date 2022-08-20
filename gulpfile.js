const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask(){
    return src('src/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('src/css', { sourcemaps: '.' }));
  }

function browsersyncServe(cb){
    browsersync.init({
        server: {
            baseDir: './src'
        }    
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask(){
    watch('src/*.html', browsersyncReload);
    watch(['src/**/*.scss', 'src/**/*.js'], series(scssTask, browsersyncReload));
}
  // Default Gulp Task
exports.default = series(
    scssTask,
    browsersyncServe,
    watchTask
);