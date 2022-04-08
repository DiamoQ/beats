const { src, dest, task, series, watch, parallel } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
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
  return src('${DIST_PATH}/**/*', { read: false })
    .pipe(clean());
});

task('copy:html', () => {
  return src('${SRC_PATH}/*.html')
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
    .pipe(px2rem())
    .pipe(gulpif(env == 'dev',       
      autoprefixer({
      cascade: false
    })
    ))
    .pipe(gulpif( env == 'prod', gcmq()))
    .pipe(gulpif( env == 'prod', cleanCSS({ compatibility: 'ie8' })))
    .pipe(gulpif ( env == 'dev' , sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src([
    ...SCRIPT_LIBS,
    'src/js/*.js'
  ])
    .pipe(gulpif(env == 'dev' , sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ";" }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulpif ( env == 'dev' , sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

const icons = [
  'src/img/map/*.svg',
  'src/img/video-icons/*.svg',
  'src/img/sprite-icons/*.svg'
  
]

task('icons', () => {
  return src(icons)
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: "(fill|stroke|style|width|height|data.*)"
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
    .pipe(dest('${DIST_PATH}/images//icons'));
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
watch(icons , series('icons'));
});


task('default',
 series(
   'clean', 
   parallel('copy:html', 'styles', 'scripts', 'icons') ,
    parallel('watch', 'server')
    )
);


task('build',
 series(
   'clean', 
   parallel('copy:html', 'styles', 'scripts', 'icons') ,
)
);