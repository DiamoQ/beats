const { src, dest, task, series, watch, parallel } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const {SRC_PATH, DIST_PATH, STYLES_LIBS, SCRIPT_LIBS} = require('./gulp.config.js');

const env = process.env.NODE_ENV;


task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(clean());
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }))
});

task('styles', () => {
  return src([
    ...STYLES_LIBS,
    "src/scss/main.scss"
  ])
    .pipe(gulpif(env == 'dev' , sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env == 'dev',       
      autoprefixer({
      cascade: false
    })
    ))
    .pipe(gulpif( env == 'prod', gcmq()))
    .pipe(gulpif( env == 'prod', cleanCSS({ compatibility: 'ie8' })))
    .pipe(gulpif ( env == 'dev' , sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/css`))
    .pipe(reload({ stream: true }))
});

task('scripts', () => {
  return src([
    ...SCRIPT_LIBS,
    'src/js/*.js'
  ])
    .pipe(gulpif(env == 'dev' , sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif ( env == 'dev' , sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/js`))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src(`${SRC_PATH}/img/**/**.svg`)
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: "(data.*)"
          }
        }
      ]
    })
    )
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/img//icons`));
});

task('copy:anotherSvg', () => {
  return src(`${SRC_PATH}/img/sprite/*.svg`)
    .pipe(dest(`${DIST_PATH}/img/icons`))
    .pipe(reload({ stream: true }))
});

task('copy:img', () => {
  return src(`${SRC_PATH}/img/*/*.png`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({ stream: true }))
});

task('copy:video', () => {
  return src(`${SRC_PATH}/video/*.mp4`)
    .pipe(dest(`${DIST_PATH}/video`))
    .pipe(reload({ stream: true }))
});


task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  })
})

task('watch', () => {
watch('src/scss/**.scss', series('styles'));
watch('src/**.html', series('copy:html'));
watch('src/js/**.js', series('scripts'));
watch('src/img/*/*.svg' , series('icons'));
});


task('default',
 series(
   'clean', 
   parallel('copy:html', 'styles', 'scripts', 'icons', 'copy:anotherSvg', 'copy:img', 'copy:video') ,
    parallel('watch', 'server')
    )
);


task('build',
 series(
   'clean', 
   parallel('copy:html', 'styles', 'scripts', 'icons' , 'copy:anotherSvg', 'copy:img', 'copy:video') ,
)
);